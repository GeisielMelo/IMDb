import { useAuth } from '../context/AuthContext'
import Navigation from '../components/Header/Navigation'
import Slider from '../components/Carousel/Slider'

const Index: React.FC = () => {
  const { user, logout } = useAuth()
  const url = {
    trending: 'https://api.themoviedb.org/3/trending/all/day?language=en-US',
    movies: 'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
    tvShow: 'https://api.themoviedb.org/3/trending/tv/day?language=en-US',
  }

  const handleLogOut = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Error on Logout.')
    }
  }

  return (
    <main>
      <Navigation user={user} handleLogOut={handleLogOut} />
      <Slider category={'Trending'} url={url.trending} />
      <Slider category={'Movies'} url={url.movies} />
      <Slider category={'TV Show'} url={url.tvShow} />
    </main>
  )
}

export default Index
