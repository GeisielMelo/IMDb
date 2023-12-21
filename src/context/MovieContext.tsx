import { ReactNode, createContext, useContext, useState } from 'react'
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
  const [movies, setMovies] = useState<MovieData[] | []>([])

  const addMovie = (data: MovieData) => {
    setMovies((prev) => [...prev, data])
  }

  const removeMovie = (data: MovieData) => {
    setMovies((prev) => prev.filter((movie: MovieData) => movie.id !== data.id))
  }

  const value: MoviesContextProps = { movies, addMovie, removeMovie }

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
}
