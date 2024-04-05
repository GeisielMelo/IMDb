import { useState } from 'react'
import imgNotFound from '../../../assets/img/imgNotFound.jpg'

type Image = {
  title: string | undefined
  src: string
}

export const Image: React.FC<Image> = ({ title, src }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const url = 'https://image.tmdb.org/t/p/w500'
  const setAlt = title ? `A poster about: ${title}` : 'The title poster.'

  return (
    <>
      <img
        className='rounded-lg shadow-lg aspect-[9/13] max-w-[200px] md:max-w-[300px] w-full'
        src={src ? url + src : imgNotFound}
        alt={setAlt}
        onLoad={() => setImageLoaded(true)}
        style={{ display: imageLoaded ? 'block' : 'none' }}
      />
      {!imageLoaded && (
        <div className='rounded-lg max-w-[200px] md:max-w-[300px] w-full animate-pulse bg-slate-500/60 aspect-[9/13]' />
      )}
    </>
  )
}
