import { options, url } from '../../config/themoviedb'
import Navigation from '../../components/Header/Navigation'
import Slider from '../../components/Carousel/Slider'
import Footer from '../../components/Footer/Footer'

const Home: React.FC = () => {
  return (
    <>
      <Navigation />
      <section className='py-10'>
        <Slider category={'Trending'} url={url.trending} options={options} />
        <Slider category={'Upcoming'} url={url.upcoming} options={options} />
        <Slider category={'Movies'} url={url.movies} options={options} />
        <Slider category={'Tv Show'} url={url.tvShow} options={options} />
      </section>
      <Footer />
    </>
  )
}

export default Home
