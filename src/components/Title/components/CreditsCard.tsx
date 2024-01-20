import { useState } from 'react'

type CreditsCard = {
  name: string
  character: string
  profilePath: string
}

export const CreditsCard: React.FC<CreditsCard> = ({ name, character, profilePath }) => {
  const avatar = 'https://www.themoviedb.org/t/p/w138_and_h175_face'
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)

  return (
    <div className='rounded-lg aspect-[9/13] shadow shadow-black/60 bg-zinc-700 text-white'>
      <img
        className='cursor-pointer rounded-t w-full'
        src={avatar + profilePath}
        alt={`${name} as ${character}.`}
        onLoad={() => setImageLoaded(true)}
        style={{ display: imageLoaded ? 'block' : 'none' }}
      />
      {!imageLoaded && <div className='cursor-pointer rounded-t aspect-[9/13] animate-pulse bg-zinc-600' />}
      <div className='p-2 h-16'>
        <h1 className='truncate'>{name}</h1>
        <p className='truncate'>{character}</p>
      </div>
    </div>
  )
}
