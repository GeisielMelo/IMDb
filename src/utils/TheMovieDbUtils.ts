import { MovieData } from "../types/MovieData"

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