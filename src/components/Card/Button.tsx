import { PlusCircle, MinusCircle } from 'lucide-react'
import { useDisplayAlert } from '../../hooks/useDisplayAlert'
import { useMovies } from '../../context/MovieContext'
import { useAuth } from '../../context/AuthContext'

type Button = {
  id: number
}

export const Button: React.FC<Button> = ({ id }) => {
  const { movies, addMovie, removeMovie } = useMovies()
  const { Alert, displayAlert } = useDisplayAlert()
  const { authenticated } = useAuth()
  const isAdded = movies.some((element) => element.id === id)

  const handleLikeMovie = (titleId: number) => {
    if (!authenticated) return displayAlert('You must be connected to perform this action.', 'info')
    const element = movies.find((element) => element.id === titleId)
    if (element) return isAdded ? removeMovie(element) : addMovie(element)
  }

  return (
    <div className='w-full mt-auto mb-4 px-2 text-white'>
      <button
        className='w-full flex items-center justify-center rounded gap-1 py-1 mt-2 transition-all bg-zinc-600 hover:bg-zinc-500'
        onClick={() => handleLikeMovie(id)}
      >
        WATCHLIST {isAdded ? <MinusCircle className='h-4' /> : <PlusCircle className='h-4' />}
      </button>
      <Alert />
    </div>
  )
}
