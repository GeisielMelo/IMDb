import Navigation from '../../components/Header/Navigation'
import Slider from '../../components/Carousel/Slider'
import Footer from '../../components/Footer/Footer'

const Home: React.FC = () => {
  const locale = navigator.language
  const url = 'https://api.themoviedb.org/3/'
  const trending = `${url}trending/all/day?language=${locale}`
  const movies = `${url}trending/movie/day?language=${locale}`
  const tvShow = `${url}trending/tv/day?language=${locale}`
  const upcoming = `${url}movie/upcoming?language=${locale}&page=1`

  return (
    <>
      <Navigation />
      <div className='py-10'>
        <Slider category={'Trending'} url={trending} />
        <Slider category={'Upcoming'} url={upcoming} />
        <Slider category={'Movies'} url={movies} />
        <Slider category={'Tv Show'} url={tvShow} />
      </div>
      <Footer />
    </>
  )
}

export default Home
