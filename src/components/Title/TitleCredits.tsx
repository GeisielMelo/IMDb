import { useState } from 'react'
import { CreditsData } from '../../types/CreditsData'
import { useFetchTMDB } from '../../hooks/useFetchTMDB'
import { CreditsCard } from './components/CreditsCard'

type Credits = {
  locale: string
  type: string
  id: string | number
}

export const TitleCredits: React.FC<Credits> = ({ locale, type, id }) => {
  const url = `https://api.themoviedb.org/3/${type}/${id}/credits?language=${locale}&page=1`
  const { data, loading, error } = useFetchTMDB<CreditsData>(url)

  const [maxCards, setMaxCards] = useState(6)

  if (error || !data) return null

  const cast = data.cast

  if (!cast.length) return null

  const isMaxCardReached = maxCards >= cast.length

  return (
    <section className='flex justify-center p-8'>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className='max-w-5xl w-full'>
          <h1 className='mb-4 px-4 py-0.5 font-sans font-semibold text-lg border border-zinc-700 text-white rounded-full max-w-max'>
            Top Cast
          </h1>
          <div className=' grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2'>
            {cast
              .slice(0, maxCards)
              .map(
                (element, key) =>
                  element.profile_path && (
                    <CreditsCard
                      key={key}
                      name={element.name}
                      character={element.character}
                      profilePath={element.profile_path}
                    />
                  ),
              )}
          </div>
          <div className='text-center mt-6'>
            {!isMaxCardReached && (
              <button
                className='py-1 px-2 m-2 border rounded-lg border-zinc-700 text-white hover:text-white/50 transition-all'
                onClick={() => setMaxCards(maxCards + 6)}
              >
                More
              </button>
            )}

            {maxCards > 6 && (
              <button
                className='py-1 px-2 m-2 border rounded-lg border-zinc-700 text-white hover:text-white/50 transition-all'
                onClick={() => setMaxCards(6)}
              >
                Hide
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
