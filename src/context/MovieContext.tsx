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
    throw new Error('useMovies must be used inside a MovieProvider.')
  }
  return context
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const { authenticated, user } = useAuth()
  const [movies, setMovies] = useState<MovieData[]>([])
  const [synced, setSynced] = useState<boolean>(false)

  useEffect(() => {
    const fetchInitialMovies = async () => {
      if (user && !synced) {
        try {
          const data = await show(user.uid)
          if (data) {
            if (!data.movies.length) {
              return
            } else {
              setMovies(data.movies)
            }
            setSynced(true)
          } else {
            await create(user.uid)
            setSynced(true)
          }
        } catch (error) {
          console.error('An error occurred while fetching initial movies.')
        }
      }
    }
    fetchInitialMovies()
  }, [user, synced, movies])

  const addMovie = async (data: MovieData) => {
    if (!authenticated || !user) {
      throw Error('You must be connected to perform this action.')
    }

    setMovies((prev) => [...prev, data])
    const newMovies = [...movies]
    newMovies.push(data)
    update(newMovies, user.uid)
  }

  const removeMovie = async (data: MovieData) => {
    if (!authenticated || !user) {
      throw Error('You must be connected to perform this action.')
    }
    setMovies((prev) => prev.filter((movie: MovieData) => movie.id !== data.id))
    const newMovies = movies.filter((movie: MovieData) => movie.id !== data.id)
    update(newMovies, user.uid)
  }

  const value: MoviesContextProps = {
    movies,
    addMovie,
    removeMovie,
  }

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
}
