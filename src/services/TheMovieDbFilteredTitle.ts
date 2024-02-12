import TheMovieDbFetcher from './TheMovieDbFetcher'

type Cast = {
  name: string
  character: string
  profile_path: string
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
      similar: await this.filterSimilarData,
      cast: await this.filterCastData(),
      reviews: await this.filterReviewsData(),
    }
    return data
  }

  private filterHeroData = async () => {}

  private filterSimilarData = async () => {}

  private filterCastData = async () => {
    try {
      const response = await this.fetcher.fetchCredits()
      if (!response.data.cast.length) return []

      const data: Cast[] = []
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
      console.error('Error on TheMovieDbFilteredTitle: filterCastData.')
      return []
    }
  }

  private filterReviewsData = async () => {}
}

export default TheMovieDbFilteredTitle
