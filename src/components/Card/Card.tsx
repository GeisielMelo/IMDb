import { PlusCircle, MinusCircle, Star } from 'lucide-react'
import { useDisplayAlert } from '../../hooks/useDisplayAlert'
import { useMovies } from '../../context/MovieContext'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

type IParams = {
  id?: string
  type?: string
}

type CardProps = {
  id: number
  src: string
  title: string
  vote: number
  media: string
}

export const Card: React.FC<CardProps> = ({ id, src, title, vote, media }) => {
  const { movies, addMovie, removeMovie } = useMovies()
  const { Alert, displayAlert } = useDisplayAlert()
  const { authenticated } = useAuth()
  const [imageLoaded, setImageLoaded] = useState(false)
  const params = useParams<IParams>()
  const navigate = useNavigate()
  const isAdded = movies.some((_) => _.id === id)

  const handleNavigate = () => {
    if (media) return navigate(`/${media}/${id}`)
    return navigate(`/${params.type}/${id}`)
  }

  const handleLikeMovie = () => {
    if (!authenticated) return displayAlert('You must be connected to perform this action.', 'info')
    const data = { id, src, title, vote, media: media || (params.type as string) }
    return isAdded ? removeMovie(data) : addMovie(data)
  }

  return (
    <>
      <div className='rounded bg-zinc-700 flex flex-col shadow shadow-black/60 text-white'>
        <img
          className='cursor-pointer rounded-t aspect-[9/13]'
          src={src}
          alt={`${title} image banner.`}
          onClick={() => handleNavigate()}
          onLoad={() => setImageLoaded(true)}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />

        {!imageLoaded && (
          <div
            className='cursor-pointer rounded-t aspect-[9/13] animate-pulse bg-zinc-600'
            onClick={() => handleNavigate()}
          />
        )}

        <div className='flex items-center px-2 pt-2'>
          <p>{vote}</p>
          <Star className='h-3 text-yellow-300' />
        </div>

        <h1 className='text-[calc(.6em+0.7vw)] leading-7 px-2 h-[60px] overflow-hidden'>{title}</h1>

        <div className='w-full mt-auto mb-4 px-2 text-white'>
          <button
            className='w-full flex items-center justify-center rounded gap-1 py-1 mt-2 transition-all bg-zinc-600 hover:bg-zinc-500'
            onClick={() => handleLikeMovie()}
          >
            WATCHLIST {isAdded ? <MinusCircle className='h-4' /> : <PlusCircle className='h-4' />}
          </button>
        </div>
      </div>
      <Alert />
    </>
  )
}
