import { ReactNode, createContext, useContext, useState, useEffect } from 'react'
import { show, create, update } from '../services/Firebase'
import { useAuth } from './AuthContext'

type Data = {
  id: number
  src: string
  title: string
  vote: number
  media: string
}

type MovieProviderProps = {
  children: ReactNode
}

type MoviesContextProps = {
  loading: boolean
  movies: Data[]
  addMovie: (data: Data) => void
  removeMovie: (data: Data) => void
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
  const { user } = useAuth()
  const [movies, setMovies] = useState<Data[]>([])
  const [synced, setSynced] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchInitialMovies = async () => {
      if (user && !synced) {
        try {
          setLoading(true)
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
        } finally {
          setLoading(false)
        }
      }
    }
    fetchInitialMovies()
  }, [user, synced, movies])

  const addMovie = async (data: Data) => {
    if (!user) return
    setMovies((prev) => [...prev, data])
    const newMovies = [...movies]
    newMovies.push(data)
    await update(newMovies, user.uid)
  }

  const removeMovie = async (data: Data) => {
    if (!user) return
    setMovies((prev) => prev.filter((movie: Data) => movie.id !== data.id))
    const newMovies = movies.filter((movie: Data) => movie.id !== data.id)
    await update(newMovies, user.uid)
  }

  const value: MoviesContextProps = {
    loading,
    movies,
    addMovie,
    removeMovie,
  }

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
}
