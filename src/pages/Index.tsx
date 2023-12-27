import { options, url } from '../config/themoviedb'
import Navigation from '../components/Header/Navigation'
import Slider from '../components/Carousel/Slider'
import ListSlider from '../components/Carousel/ListSlider'
import { useMovies } from '../context/MovieContext'
import Footer from '../components/Footer/Footer'

const Index: React.FC = () => {
  const { movies, loading } = useMovies()

  return (
    <>
      <Navigation />
      <section>
        {!!movies.length && (
          <ListSlider category='My List' data={movies} loading={loading} />
        )}
        <Slider category={'Trending'} url={url.trending} options={options} />
        <Slider category={'Upcoming'} url={url.upcoming} options={options} />
        <Slider category={'Movies'} url={url.movies} options={options} />
        <Slider category={'Tv Show'} url={url.tvShow} options={options} />
      </section>
      <Footer/>
    </>
  )
}

export default Index
