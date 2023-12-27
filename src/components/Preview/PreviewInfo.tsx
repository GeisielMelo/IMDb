import { FC } from 'react'
import { Heart } from 'lucide-react'
import IMDB from '../../assets/svg/IMDB.svg'

type Info = {
  title: string | undefined
  year: string | undefined
  description: string | undefined
  added: boolean | undefined
  vote: string | undefined
  onLike: () => void
}

export const Info: FC<Info> = ({ title, year, description, vote, added, onLike }) => {
  return (
    <div className='flex flex-col mt-4 md:ml-4 md:mt-0'>
      <h1 className='font-sans font-medium'>{`${title} - ${year}`}</h1>
      <p className='py-4 mb-8'>{description}</p>
      <>
        <div className='absolute bottom-8 flex gap-2'>
          <img className='w-12' src={IMDB} alt='IMDB Logo' />
          <span>{vote}</span>
        </div>
        <div className='absolute bottom-8 right-8 flex gap-2'>
          <button className='bg-transparent' onClick={onLike}>
            {added ? <Heart className={'text-red-600'} /> : <Heart />}
          </button>
        </div>
      </>
    </div>
  )
}
