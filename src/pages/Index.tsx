import { options, url } from '../config/themoviedb'
import Navigation from '../components/Header/Navigation'
import Slider from '../components/Carousel/Slider'
import ListSlider from '../components/Carousel/ListSlider'
import { useMovies } from '../context/MovieContext'

const Index: React.FC = () => {
  const { movies } = useMovies()

  return (
    <main>
      <Navigation />
      {!!movies.length && <ListSlider category='My List' data={movies} />}
      <Slider category={'Trending'} url={url.trending} options={options} />
      <Slider category={'Recently added'} url={url.upcoming} options={options} />
      <Slider category={'Movies'} url={url.movies} options={options} />
      <Slider category={'Tv Show'} url={url.tvShow} options={options} />
    </main>
  )
}

export default Index
