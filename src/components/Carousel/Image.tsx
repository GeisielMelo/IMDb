import { useState } from 'react'

type TImage = {
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined
  src: string | undefined
  alt: string | undefined
}

export const Image: React.FC<TImage> = ({ onClick, src, alt }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const handleImageLoad = () => {
    setIsImageLoaded(true)
  }

  return (
    <div
      className='relative mx-[0.25rem] aspect-[9/13] hover:cursor-pointer'
      onClick={onClick}
    >
      <img src={src} alt={alt} onLoad={handleImageLoad} className='aspect-[9/13]'/>
      <div
        className={`absolute top-0 left-0 w-full h-full bg-slate-400 ${
          isImageLoaded && 'hidden'
        }`}
      >
        <div className='animate-pulse w-full h-full bg-slate-500' />
      </div>
    </div>
  )
}
