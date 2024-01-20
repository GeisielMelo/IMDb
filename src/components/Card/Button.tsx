import { PlusCircle, MinusCircle } from 'lucide-react'
import { useDisplayAlert } from '../../hooks/useDisplayAlert'
import { useMovies } from '../../context/MovieContext'
import { useAuth } from '../../context/AuthContext'
import { MovieData } from '../../types/MovieData'
import { useParams } from 'react-router-dom'

type Button = {
  element: MovieData
}

export const Button: React.FC<Button> = ({ element }) => {
  const { movies, addMovie, removeMovie } = useMovies()
  const { Alert, displayAlert } = useDisplayAlert()
  const { authenticated } = useAuth()
  const params = useParams()
  const isAdded = movies.some((_) => _.id === element.id)

  const handleLikeMovie = () => {
    if (!authenticated) return displayAlert('You must be connected to perform this action.', 'info')

    if (params) {
      const newData = { ...element, media_type: params.type as string }
      return isAdded ? removeMovie(newData) : addMovie(newData)
    } else {
      return isAdded ? removeMovie(element) : addMovie(element)
    }
  }

  return (
    <div className='w-full mt-auto mb-4 px-2 text-white'>
      <button
        className='w-full flex items-center justify-center rounded gap-1 py-1 mt-2 transition-all bg-zinc-600 hover:bg-zinc-500'
        onClick={() => handleLikeMovie()}
      >
        WATCHLIST {isAdded ? <MinusCircle className='h-4' /> : <PlusCircle className='h-4' />}
      </button>
      <Alert />
    </div>
  )
}
