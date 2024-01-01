import { useLocation } from 'react-router-dom'
import Navigation from '../../components/Header/Navigation'
import Footer from '../../components/Footer/Footer'
import Slider from '../../components/Carousel/Slider'

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
      <section className='py-10'>
        {q && <Slider category={'Results'} url={formatUrl(q, 1)} />}
      </section>
      <Footer fixed={true} />
    </>
  )
}

export default Search
