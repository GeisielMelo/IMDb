import { useState, useEffect } from 'react'
import { options } from '../config/themoviedb'

type FetchDataError = {
  status: number
  message?: string
}

type FetchDataReturn<T> = {
  movie: T | null
  release: T | null
  loading: boolean
  error: FetchDataError | null
}

export function useFetchMovie<T>(id: string | undefined): FetchDataReturn<T> {
  const locale = navigator.language
  const movieUrl = `https://api.themoviedb.org/3/movie/${id}?language=${locale}`
  const releaseUrl = `https://api.themoviedb.org/3/movie/${id}/release_dates`

  const [movie, setMovie] = useState<T | null>(null)
  const [release, setRelease] = useState<T | null>(null)
  const [error, setError] = useState<FetchDataError | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const responseMovie = await fetch(movieUrl, options)
        const responseRelease = await fetch(releaseUrl, options)
        const movieData = await responseMovie.json()
        const releaseData = await responseRelease.json()
        setMovie(movieData)
        setRelease(releaseData)
      } catch (error) {
        setError(error as FetchDataError)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [movieUrl, releaseUrl])

  return { movie, release, error, loading }
}
