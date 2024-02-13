import { useState, useEffect } from 'react'
import TheMovieDbFilteredTitle from '../services/TheMovieDbFilteredTitle'

type FetchDataError = {
  status: number
  message?: string
}

type FetchDataReturn<T> = {
  data: T | null
  loading: boolean
  error: FetchDataError | null
}

export function useFetchTitle<T>(type: 'movie' | 'tv', id: number, locale: string): FetchDataReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<FetchDataError | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        if (!loading) setLoading(true)
        const fetcher = new TheMovieDbFilteredTitle(id, type, locale)
        const response = await fetcher.getFilteredTitle()

        if(response) console.log(response)

        // setData(response)
      } catch (error) {
        setError(error as FetchDataError)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [type, id, locale])

  return { data, error, loading }
}
