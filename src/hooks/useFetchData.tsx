import { useState, useEffect } from 'react'

type FetchDataError = {
  status: number;
  message?: string;
}

type FetchDataReturn<T> = {
  data: T | null
  loading: boolean
  error: FetchDataError | null
}

export function useFetchData<T>(url: string): FetchDataReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<FetchDataError | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async ():Promise<void> => {
      try {
        const response = await fetch(url)
        const data = await response.json()
        setData(data)
      } catch (error) {
        setError(error as FetchDataError)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url])

  return { data, error, loading }
}
