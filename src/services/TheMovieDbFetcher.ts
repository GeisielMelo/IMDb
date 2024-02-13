import axios, { AxiosResponse } from 'axios'

interface CreditsApiResponse {
  cast: {
    name: string
    character: string
    profile_path: string | null
  }[]
}

interface SimilarApiResponse {
  results: {
    id: number
    original_title: string
    title: string
    poster_path: string | null
    vote_average: number
  }[]
}

interface ReviewsApiResponse {
  results: {
    author_details: {
      username: string
    }
    content: string
  }[]
}

interface TitleApiResponse {
  id: number
  backdrop_path: string
  genres: {
    name: string
  }[]
  original_title: string
  title: string
  overview: string
  poster_path: string
  release_date: string
  runtime: number
  tagline: string
}

interface AudienceApiResponse {
  results: {
    iso_3166_1: string
    release_dates: {
      certification: string
    }[]
  }[]
}

interface TrailerApiResponse {
  results: {
    name: string
    type: string
    key: string
    official: boolean
  }[]
}

class TheMovieDbFetcher {
  locale: string
  url: string
  type: string
  id: number

  constructor(id: number, type: string, locale: string = 'en-US') {
    this.locale = locale
    this.type = type
    this.id = id
    this.url = 'https://api.themoviedb.org/3/'
  }

  public fetchTitle = async (): Promise<AxiosResponse<TitleApiResponse>> => {
    const url: string = `${this.url}${this.type}/${this.id}?language=${this.locale}`
    return await axios.get(url, this.getAuthorization())
  }

  public fetchAudience = async (): Promise<AxiosResponse<AudienceApiResponse>> => {
    const url: string = `${this.url}${this.type}/${this.id}/release_dates`
    return await axios.get(url, this.getAuthorization())
  }

  public fetchTrailer = async (): Promise<AxiosResponse<TrailerApiResponse>> => {
    const url: string = `${this.url}${this.type}/${this.id}/videos?language=${this.locale}`
    return await axios.get(url, this.getAuthorization())
  }

  public fetchCredits = async (): Promise<AxiosResponse<CreditsApiResponse>> => {
    const url: string = `${this.url}${this.type}/${this.id}/credits?language=${this.locale}`
    return await axios.get(url, this.getAuthorization())
  }

  public fetchReviews = async (): Promise<AxiosResponse<ReviewsApiResponse>> => {
    const url: string = `${this.url}${this.type}/${this.id}/reviews?language=${this.locale}`
    return await axios.get(url, this.getAuthorization())
  }

  public fetchSimilar = async (): Promise<AxiosResponse<SimilarApiResponse>> => {
    const url: string = `${this.url}${this.type}/${this.id}/similar?language=${this.locale}`
    return await axios.get(url, this.getAuthorization())
  }

  private getAuthorization = () => {
    return {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_THEMOVIEDB_AUTHORIZATION}`,
      },
    }
  }
}

export default TheMovieDbFetcher
