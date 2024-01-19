import { Minus, Plus } from 'lucide-react'
import { TitleData } from '../../../types/TitleData'
import { useMovies } from '../../../context/MovieContext'
import { useDisplayAlert } from '../../../hooks/useDisplayAlert'
import { useAuth } from '../../../context/AuthContext'

type Watch = {
  element: TitleData
  type: string
}

export const Watch: React.FC<Watch> = ({ element, type }) => {
  const { movies, addMovie, removeMovie } = useMovies()
  const { Alert, displayAlert } = useDisplayAlert()
  const { authenticated } = useAuth()
  const isAdded = movies.some((_) => _.id === element.id)

  const handleLikeMovie = () => {
    const newData = { ...element, media_type: type }
    if (!authenticated) return displayAlert('You must be connected to perform this action.', 'info')
    return isAdded ? removeMovie(newData) : addMovie(newData)
  }

  return (
    <>
      <button
        className='flex items-center justify-center rounded-[50%] px-1 py-2 text-white bg-[#032541]'
        onClick={() => handleLikeMovie()}
      >
        {isAdded ? <Minus className='h-4' /> : <Plus className='h-4' />}
      </button>
      <Alert />
    </>
  )
}
