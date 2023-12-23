import { MovieData } from '../types/MovieData'
import { useAuth } from '../context/AuthContext'
import { useMovies } from '../context/MovieContext'
import { Home, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ListSlider from '../components/Carousel/ListSlider'

const List: React.FC = () => {
  const navigate = useNavigate()
  const { movies } = useMovies()
  const { logout } = useAuth()
  const movieList: MovieData[] = []
  const serieList: MovieData[] = []

  movies.forEach((element) => {
    if (element.media_type == 'tv') {
      serieList.push(element)
    } else {
      movieList.push(element)
    }
  })

  return (
    <section>
      <nav className='flex justify-between items-center p-4 shadow-md'>
        <button onClick={() => navigate('/')}>
          <Home />
        </button>
        <h1 className='font-sans font-medium'>My List</h1>
        <button onClick={() => logout()}><LogOut /></button>
      </nav>
      <div>
        <ListSlider category='Movies' data={movieList} />
        <ListSlider category='Series' data={serieList} />
      </div>
    </section>
  )
}

export default List
