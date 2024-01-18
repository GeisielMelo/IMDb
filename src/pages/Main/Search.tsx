import { useLocation } from 'react-router-dom'
import { useLanguages } from '../../hooks/useLanguages'
import { useInfiniteScroll as InfiniteScroll } from '../../hooks/useInfiniteScroll'
import { handleGetTitlePoster, handleGetTitleName, handleGetTitleVote } from '../../utils/TheMovieDbUtils'
import { Card } from '../../components/Card/Card'
import Navigation from '../../components/Header/Navigation'
import Footer from '../../components/Footer/Footer'
import { MovieData } from '../../types/MovieData'
import { useEffect, useState } from 'react'

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

const Search = () => {
  const { locale } = useLanguages()
  const { search } = useLocation()

  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(0)
  const [data, setData] = useState<MovieData[] | null>(null)
  const [loading, setLoading] = useState(true)

  const queryParams = new URLSearchParams(search)
  const title: string | null = queryParams.get('title')
  const type: string | null = queryParams.get('type')

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (!title || !type) throw new Error('Missing Params.')

      const formattedQuery = title.replace(' ', '%20')
      const url = `https://api.themoviedb.org/3/search/${type}?query=${formattedQuery}&include_adult=false&language=${locale}&page=${page}`

      try {
        const response = await fetch(url, options)
        const result = await response.json()

        if (data) {
          setData([...data, ...result.results])
        } else {
          setData(result.results)
        }

        if (maxPage == 0) setMaxPage(result.total_pages)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [page])

  return (
    <>
      <Navigation />
      <section className='flex flex-col min-h-screen items-center justify-center px-2 md:px-8 pt-4 pb-8'>
        <h1 className='max-w-7xl w-full mb-4'>Watchlist</h1>
        <div className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 max-w-7xl w-full'>
          {loading ? (
            <>
              {[...Array(12)].map((_, key) => (
                <div key={key} className='max-w-xl w-full h-96 rounded animate-pulse bg-gray-500' />
              ))}
            </>
          ) : (
            <>
              {data ? (
                <>
                  {data.map((element, key) => (
                    <Card
                      key={key}
                      id={element.id}
                      src={handleGetTitlePoster(element)}
                      title={handleGetTitleName(element)}
                      vote={handleGetTitleVote(element)}
                      media={element.media_type}
                    />
                  ))}
                </>
              ) : (
                <div>No results for this search.</div>
              )}
            </>
          )}
        </div>
        {page < maxPage && data && !loading && <InfiniteScroll fetchMore={() => setPage(page + 1)} />}
      </section>
      <Footer />
    </>
  )
}

export default Search
