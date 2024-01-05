export type MovieData = {
  backdrop_path: string | null
  poster_path: string | null
  original_language: string
  original_title?: string
  original_name?: string
  overview: string
  release_date?: string
  first_air_date?: string
  media_type: string
  title?: string
  name?: string
  video?: boolean
  adult: boolean
  genre_ids: number[]
  vote_average: number
  vote_count: number
  popularity: number
  tagline: string
  id: number
}
