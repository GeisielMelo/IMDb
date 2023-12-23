import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react'
import { show, create, update } from '../services/Firebase'
import { useAuth } from './AuthContext'
import { MovieData } from '../types/MovieData'

type MovieProviderProps = {
  children: ReactNode
}

type MoviesContextProps = {
  movies: MovieData[]
  addMovie: (data: MovieData) => void
  removeMovie: (data: MovieData) => void
}

const MovieContext = createContext<MoviesContextProps | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useMovies = () => {
  const context = useContext(MovieContext)
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider.')
  }
  return context
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const { authenticated, user } = useAuth()
  const [movies, setMovies] = useState<MovieData[] | []>([])

  useEffect(() => {
    const fetchHistory = async () => {
      if (user) {
        try {
          const data = await show(user.uid)
          if (data) {
            if (data.movies) setMovies(data.movies)
          } else {
            await create(user.uid)
          }
        } catch (error) {
          console.error('An error occurred while fetching the data.')
        }
      }
    }
    fetchHistory()
  }, [user])

  const syncData = async () => {
    try {
      if (user) await update(movies, user.uid)
    } catch (error) {
      console.error('An error occurred while synchronizing the data.')
    }
  }

  const addMovie = (data: MovieData) => {
    if (!authenticated)
      throw Error('You must be connected to perform this action.')
    setMovies((prev) => [...prev, data])
    syncData()
  }

  const removeMovie = (data: MovieData) => {
    if (!authenticated)
      throw Error('You must be connected to perform this action.')
    setMovies((prev) => prev.filter((movie: MovieData) => movie.id !== data.id))
    syncData()
  }

  const value: MoviesContextProps = { movies, addMovie, removeMovie }

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
}
