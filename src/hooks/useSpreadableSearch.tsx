import { useEffect, useState } from 'react'
import { MovieData } from '../types/MovieData'

type FetchDataError = {
  status: number
  message?: string
}

type Headers = {
  accept: string
  Authorization: string
}

type Options = {
  method: 'GET'
  headers: Headers
}

const options: Options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_THEMOVIEDB_AUTHORIZATION}`,
  },
}

export const useSpreadableSearch = (query: string | null, type: string | null, locale: string) => {
  const [data, setData] = useState<MovieData[] | null>(null)
  const [error, setError] = useState<FetchDataError | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [maxPage, setMaxPage] = useState<number>(0)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        if (!query || !type) throw Error('Missing Params')
        const formattedQuery = query.replace(' ', '%20')
        const url = 'https://api.themoviedb.org/3/search'
        const fullUrl = `${url}/${type}?query=${formattedQuery}&include_adult=false&language=${locale}&page=${page}`
        if (data) setLoadingMore(true)

        const response = await fetch(fullUrl, options)
        const result = await response.json()

        if (data) {
          setData([...data, ...result.results])
        } else {
          setData(result.results)
        }

        if (maxPage == 0) setMaxPage(result.total_pages)
      } catch (error) {
        setError(error as FetchDataError)
      } finally {
        setLoading(false)
        setLoadingMore(false)
      }
    }
    fetchData()
  }, [page])

  return { page, maxPage, data, loading, loadingMore, error, setPage }
}
