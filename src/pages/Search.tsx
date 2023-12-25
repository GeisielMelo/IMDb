import { useLocation } from 'react-router-dom'
import { options } from '../config/themoviedb'
import Navigation from '../components/Header/Navigation'
import Slider from '../components/Carousel/Slider'

const Search = () => {
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const q: string | null = queryParams.get('q')

  const formatUrl = (query: string, page: number) => {
    const formattedQuery = query.replace(' ', '%20')
    return `https://api.themoviedb.org/3/search/movie?query=${formattedQuery}&include_adult=false&language=en-US&page=${page}`
  }

  return (
    <>
      <Navigation />
      <section>
        {q && (
          <Slider
            category={'Results'}
            url={formatUrl(q, 1)}
            options={options}
          />
        )}
      </section>
    </>
  )
}

export default Search
