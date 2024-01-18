import { Star } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from './Button'
import { MovieData } from '../../types/MovieData'

type IParams = {
  id?: string
  type?: string
}

type CardProps = {
  id: number
  src: string
  title: string
  vote: number
  media: string | null
  element: MovieData
}

export const Card: React.FC<CardProps> = ({ id, src, title, vote, media, element }) => {
  const params = useParams<IParams>()
  const navigate = useNavigate()

  const handleNavigate = () => {
    if (media) navigate(`/${media}/${id}`)
    navigate(`/${params.type}/${id}`)
  }

  return (
    <div className='rounded bg-zinc-700 flex flex-col shadow shadow-black/60 text-white'>
      <img
        className='cursor-pointer rounded-t aspect-[9/13]'
        src={src}
        alt={`${title} image banner.`}
        onClick={() => handleNavigate()}
      />

      <div className='flex items-center px-2 pt-2'>
        <p>{vote}</p>
        <Star className='h-3 text-yellow-300' />
      </div>

      <h1 className='text-lg px-2'>{title}</h1>

      <Button element={element} />
    </div>
  )
}
