import { Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from './Button'

type CardProps = {
  id: number
  src: string
  title: string
  vote: number
  media: string | null
}

export const Card: React.FC<CardProps> = ({ id, src, title, vote, media }) => {
  const navigate = useNavigate()

  return (
    <div className='rounded bg-zinc-700 flex flex-col shadow shadow-black/60 text-white'>
      <img
        className='cursor-pointer rounded-t'
        src={src}
        alt={`${title} image banner.`}
        onClick={() => navigate(`/${media}/${id}`)}
      />

      <div className='flex items-center px-2 pt-2'>
        <p>{vote}</p>
        <Star className='h-3 text-yellow-300' />
      </div>

      <h1 className='text-lg px-2'>{title}</h1>
      <Button id={id} />
    </div>
  )
}
