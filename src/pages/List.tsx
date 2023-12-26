import { MovieData } from '../types/MovieData'
import { useAuth } from '../context/AuthContext'
import { useMovies } from '../context/MovieContext'
import { Home, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ListSlider from '../components/Carousel/ListSlider'

const List: React.FC = () => {
  const navigate = useNavigate()
  const { movies, loading } = useMovies()
  const { logout } = useAuth()
  const movieList: MovieData[] = []
  const serieList: MovieData[] = []
  const otherList: MovieData[] = []

  movies.forEach((element) => {
    if (element.media_type == 'tv') serieList.push(element)
    else if (element.media_type == 'movie') movieList.push(element)
    else otherList.push(element)
  })

  return (
    <section>
      <nav className='flex justify-between items-center p-4 shadow-md'>
        <button onClick={() => navigate('/')}>
          <Home />
        </button>
        <h1 className='font-sans font-medium'>My List</h1>
        <button onClick={() => logout()}>
          <LogOut />
        </button>
      </nav>
      {movies.length ? (
        <>
          {!!movieList.length && (
            <ListSlider category='Movies' data={movieList} loading={loading} />
          )}
          {!!serieList.length && (
            <ListSlider category='Series' data={serieList} loading={loading} />
          )}
          {!!otherList.length && (
            <ListSlider category='Others' data={otherList} loading={loading} />
          )}
        </>
      ) : (
        <>
          <h1 className='text-center p-8'>
            Your list is empty,{' '}
            <span
              className='cursor-pointer underline'
              onClick={() => navigate('/')}
            >
              return to home.
            </span>
          </h1>
        </>
      )}
    </section>
  )
}

export default List
