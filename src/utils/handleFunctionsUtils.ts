import { MovieData } from '../types/MovieData'
import { TitleData } from '../types/TitleData'
import { VideosData } from '../types/VideosData'

export const handleGetTitleName = (element: MovieData): string => {
  if (element.title) return element.title
  if (element.name) return element.name
  if (element.original_title) return element.original_title
  else return 'Movie'
}

export const handleGetTitlePoster = (element: MovieData): string => {
  const path = element.poster_path
  const url = `https://image.tmdb.org/t/p/w500${path}`
  const notFoundUrl = '/backgroundNotFound.jpg'
  return path ? url : notFoundUrl
}

export const handleGetTitleVote = (element: MovieData): number => {
  const vote = element.vote_average
  const noVote = 0.0
  return vote ? Number(vote.toPrecision(2)) : noVote
}

export const handleAddMediaType = (data: MovieData[], type: string): MovieData[] => {
  return data.map((element) => {
    if (!Object.prototype.hasOwnProperty.call(element, 'media_type')) {
      return { ...element, media_type: type }
    }
    return element
  })
}

export const handleGetTitleReleaseYear = (element: TitleData) => {
  const date = element.first_air_date || element.release_date
  if (!date) return ''
  const year = date.split('-')[0]
  return `(${year})`
}

export const handleTitleDuration = (minutes: number) => {
  const hh = Math.floor(minutes / 60)
  const mm = minutes % 60
  return minutes ? `${hh}h ${mm}m` : ''
}

export const handleGetTitleKey = (element: VideosData) => {
  const trailers = element.results.filter((_) => _.type === 'Trailer' && _.official)
  const teasers = element.results.filter((_) => _.type === 'Teaser' && _.official)

  if (trailers.length) {
    const randomIndex = Math.floor(Math.random() * trailers.length)
    const randomTrailer = trailers[randomIndex]
    return randomTrailer.key
  } else {
    const randomIndex = Math.floor(Math.random() * teasers.length)
    const randomTeaser = teasers[randomIndex]
    return randomTeaser.key
  }
}

export const handleTitleHasVideo = (element: VideosData) => {
  const trailers = element.results.filter((_) => _.type === 'Trailer' && _.official)
  const teasers = element.results.filter((_) => _.type === 'Teaser' && _.official)
  const hasTrailers = !!trailers.length
  const hasTeasers = !!teasers.length

  if (hasTrailers || hasTeasers) {
    return true
  }
  return false
}

export const handleVoteAverageToPercent = (vote: number) => {
  if (!vote) return 0
  const fixedVote = parseFloat(vote.toFixed(2))
  return Math.round(fixedVote * 10)
}
