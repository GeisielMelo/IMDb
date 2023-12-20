import Navigation from '../components/Header/Navigation'
import Slider from '../components/Carousel/Slider'

const Index: React.FC = () => {
  return (
    <main>
      <Navigation />
      <Slider category={'Trending'} url=''/>
      <Slider category={'TV Show'} url=''/>
      <Slider category={'Movies'} url=''/>
    </main>
  )
}

export default Index
