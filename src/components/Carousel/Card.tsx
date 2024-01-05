import { useState } from 'react'
import { PlusCircle, MinusCircle, Star } from 'lucide-react'

type Card = {
  handleRedirect: () => void
  handleWatch: () => void
  src: string | undefined
  alt: string | undefined
  title: string | undefined
  note: string | undefined
  added: boolean | undefined
  watchList: boolean | undefined
}

export const Card: React.FC<Card> = ({
  handleRedirect,
  handleWatch,
  src,
  alt,
  title,
  added,
  note,
  watchList = true,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const handleImageLoad = () => {
    setIsImageLoaded(true)
  }

  return (
    <>
      <div className='relative mx-[0.25rem] aspect-[9/13] hover:cursor-pointer'>
        <img
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          className='aspect-[9/13] rounded-lg'
          onClick={handleRedirect}
        />
        <div
          className={`absolute top-0 left-0 w-full h-full bg-slate-400 ${
            isImageLoaded && 'hidden'
          }`}
        >
          <div className='animate-pulse w-full h-full bg-slate-500' />
        </div>
      </div>

      <div className='mx-1 mb-2'>
        <div className='flex items-center py-1'>
          <h1 className='text-sm'>{note}</h1>
          <Star className='h-4' />
        </div>
        <div className='h-20'>{title}</div>
        {watchList && (
          <button
            className='flex justify-center items-center rounded-full w-full py-1 text-[0.875rem] font-normal tracking-wide border border-zinc-500'
            onClick={handleWatch}
          >
            {added ? <MinusCircle className='h-4' /> : <PlusCircle className='h-4' />} WATCHLIST
          </button>
        )}
      </div>
    </>
  )
}
