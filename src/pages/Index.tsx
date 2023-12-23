import { options } from '../config/themoviedb'
import Navigation from '../components/Header/Navigation'
import Slider from '../components/Carousel/Slider'

const url = {
  trending: 'https://api.themoviedb.org/3/trending/all/day?language=en-US',
  movies: 'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
  tvShow: 'https://api.themoviedb.org/3/trending/tv/day?language=en-US',
}

const Index: React.FC = () => {
  return (
    <main>
      <Navigation />
      <Slider category={'Trending'} url={url.trending} options={options} />
    </main>
  )
}

export default Index
