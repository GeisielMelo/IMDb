import { useState } from 'react'
import { CreditsData } from '../../types/CreditsData'

type CreditsProps = {
  credits: CreditsData
}

const TitleCredits: React.FC<CreditsProps> = ({ credits }) => {
  const url = 'https://www.themoviedb.org/t/p/w138_and_h175_face'
  const [maxCards, setMaxCards] = useState(6)
  const isMaxCardReached = maxCards >= credits.cast.length

  return (
    <div className='max-w-5xl w-full'>
      <h1 className='mb-6 text-xl font-semibold'>Top Cast</h1>
      <div className=' grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2'>
        {credits.cast.slice(0, maxCards).map(
          (element, key) =>
            element.profile_path && (
              <div className='max-w-[150px] shadow rounded-lg' key={key}>
                <img
                  className='object-contain w-full rounded-t-lg'
                  src={url + element.profile_path}
                  alt={`${element.name} as ${element.character}.`}
                />
                <h1>{element.name}</h1>
                <p>{element.character}</p>
              </div>
            ),
        )}
      </div>
      <div className='text-center mt-6'>
        {!isMaxCardReached && (
          <button
            className='py-1 px-2 m-2 border border-zinc-500 rounded-lg'
            onClick={() => setMaxCards(maxCards + 6)}
          >
            More
          </button>
        )}

        {maxCards > 6 && (
          <button
            className='py-1 px-2 m-2 border border-zinc-500 rounded-lg'
            onClick={() => setMaxCards(6)}
          >
            Hide
          </button>
        )}
      </div>
    </div>
  )
}

export default TitleCredits
