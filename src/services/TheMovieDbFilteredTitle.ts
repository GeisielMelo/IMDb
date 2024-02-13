import TheMovieDbFetcher from './TheMovieDbFetcher'

type Cast = {
  name: string
  character: string
  profile_path: string
}

type Similar = {
  id: number
  src: string
  title: string
  vote: number
  media: string
}

type Review = {
  user: string
  content: string
}

class TheMovieDbFilteredTitle {
  locale: string
  type: string
  id: number
  fetcher: TheMovieDbFetcher

  constructor(id: number, type: string, locale: string = 'en-US') {
    this.locale = locale
    this.type = type
    this.id = id
    this.fetcher = new TheMovieDbFetcher(id, type, locale)
  }

  public getFilteredTitle = async () => {
    const data = {
      hero: await this.filterHeroData(),
      similar: await this.filterSimilarData(),
      credits: await this.filterCreditsData(),
      reviews: await this.filterReviewsData(),
    }
    return data
  }

  private filterHeroData = async () => {
    try {
      const title = await this.fetcher.fetchTitle()
      const audience = await this.fetcher.fetchAudience()
      const trailer = await this.fetcher.fetchTrailer()

      return {
        id: title.data.id,
        backdrop_path: title.data.backdrop_path
          ? `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${title.data.backdrop_path}`
          : 'https://via.placeholder.com/150',
        genres: title.data.genres,
        original_title: title.data.original_title,
        title: title.data.title,
        overview: title.data.overview,
        poster_path: title.data.poster_path
          ? `https://image.tmdb.org/t/p/w500${title.data.poster_path}`
          : 'https://via.placeholder.com/150',
        release_date: title.data.release_date,
        runtime: title.data.runtime,
        tagline: title.data.tagline,
        audience: audience.data.results,
        trailer: trailer.data.results,
      }
    } catch (error) {
      throw new Error('Error on TheMovieDbFilteredTitle: filterHeroData.')
    }
  }

  private filterSimilarData = async () => {
    try {
      const response = await this.fetcher.fetchSimilar()
      const data: Similar[] = []
      if (!response.data.results.length) return []

      response.data.results.forEach((element) => {
        const item: Similar = {
          id: element.id,
          src: element.poster_path
            ? `https://image.tmdb.org/t/p/w500${element.poster_path}`
            : 'https://via.placeholder.com/150',
          title: element.title || element.original_title || 'N/A',
          vote: element.vote_average || 0,
          media: this.type,
        }
        data.push(item)
      })
      return data
    } catch (error) {
      throw new Error('Error on TheMovieDbFilteredTitle: filterSimilarData.')
    }
  }

  private filterCreditsData = async () => {
    try {
      const response = await this.fetcher.fetchCredits()
      const data: Cast[] = []
      if (!response.data.cast.length) return []
      response.data.cast.forEach((element) => {
        const item: Cast = {
          name: element.name || 'N/A',
          character: element.character || 'N/A',
          profile_path: element.profile_path
            ? `https://www.themoviedb.org/t/p/w138_and_h175_face${element.profile_path}`
            : 'https://via.placeholder.com/150',
        }
        data.push(item)
      })
      return data
    } catch (error) {
      throw new Error('Error on TheMovieDbFilteredTitle: filterCastData.')
    }
  }

  private filterReviewsData = async () => {
    try {
      const response = await this.fetcher.fetchReviews()
      const data: Review[] = []
      if (!response.data.results.length) return []
      response.data.results.forEach((element) => {
        const item: Review = {
          user: element.author_details.username || 'N/A',
          content: element.content || 'N/A',
        }
        data.push(item)
      })
      return data
    } catch (error) {
      throw new Error('Error on TheMovieDbFilteredTitle: filterReviewsData.')
    }
  }
}

export default TheMovieDbFilteredTitle
