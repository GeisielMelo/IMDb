import axios, { AxiosResponse } from 'axios'

interface CastApiResponse {
  cast: {
    name: string;
    character: string;
    profile_path: string | null;
  }[];
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

  public fetchAudience = async (): Promise<Response> => {
    const url: string = `${this.url}${this.type}/${this.id}/release_dates`
    return await axios.get(url, this.getAuthorization())
  }

  public fetchTrailer = async (): Promise<Response> => {
    const url: string = `${this.url}${this.type}/${this.id}/videos?language=${this.locale}`
    return await axios.get(url, this.getAuthorization())
  }

  public fetchCredits = async (): Promise<AxiosResponse<CastApiResponse>> => {
    const url: string = `${this.url}${this.type}/${this.id}/credits?language=${this.locale}`
    return await axios.get(url, this.getAuthorization())
  }

  public fetchName = async (): Promise<Response> => {
    const url: string = `${this.url}${this.type}/${this.id}?language=${this.locale}`
    return await axios.get(url, this.getAuthorization())
  }

  public fetchReviews = async (): Promise<Response> => {
    const url: string = `${this.url}${this.type}/${this.id}/reviews?language=${this.locale}`
    return await axios.get(url, this.getAuthorization())
  }

  public fetchSimilar = async (): Promise<Response> => {
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
