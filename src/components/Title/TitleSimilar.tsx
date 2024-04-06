import { useFetchCategory } from '../../hooks/useFetchCategory'
import { MovieData } from '../../types/MovieData'
import { filterMovieDataArr } from '../../utils/filterData'
import { Card } from '../Card/Card'

type Similar = {
  locale: string
  type: string
  id: string | number
}

export const TitleSimilar: React.FC<Similar> = ({ locale, type, id }) => {
  const url = `https://api.themoviedb.org/3/${type}/${id}/similar?language=${locale}&page=1`

  const { data, error } = useFetchCategory<MovieData[]>(url)

  if (error) return null

  return (
    <section className='flex flex-col item-center justify-center w-full py-4'>
      <h2 className='flex ml-8 mb-4 px-4 py-0.5 font-sans font-semibold text-lg border border-zinc-700 text-white rounded-full max-w-max capitalize'>
        {type}
      </h2>
      {data && (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-8'>
          {filterMovieDataArr(data).slice(0, 6).map((element, key) => (
            <Card
              key={key}
              id={element.id}
              src={element.src}
              title={element.title}
              vote={element.vote}
              media={element.media}
            />
          ))}
        </div>
      )}
    </section>
  )
}
