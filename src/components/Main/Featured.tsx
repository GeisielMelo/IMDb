import information from '../../jsons/searched.json'
import IMDB from '../../assets/svg/IMDB.svg'
import { Eye, Heart } from 'lucide-react'

type Data = {
  backdrop_path: string | null
  poster_path: string | null
  original_language: string
  original_title: string
  overview: string
  release_date: string
  title: string
  video: boolean
  adult: boolean
  genre_ids: number[]
  vote_average: number
  vote_count: number
  popularity: number
}

const Featured: React.FC = () => {
  const data: Data[] = information.results

  if (!data || !Array.isArray(data)) {
    return
  }

  const handlePosterPath = (path: string | null): string => {
    const url = `https://image.tmdb.org/t/p/w500${path}`
    const notFoundUrl = '/backgroundNotFound.jpg'
    return path ? url : notFoundUrl
  }

  const handleFormatToYear = (date: string): string => {
    return date.split('-')[0]
  }

  const handleFormatVoteAverage = (vote: number): string => {
    return Number(vote).toPrecision(2)
  }

  const handleFormatTitle = (title: string): string => {
    return title.slice(0, 25) + '...'
  }

  console.log(data.length)

  return (
    <div className='flex justify-center overflow-hidden'>
      <div className='w-[2.5rem] bg-red-700 z-10'></div>

      <div className='flex w-[calc(100%-5rem)] translate-x-[-0%]'>
        {data.map((element, key) => (
          <div key={key} className='flex-shrink-0 flex-[0-0-25%] w-[12.5%] h-[18.8rem] aspect-[9/16] px-[.25rem]'>
            <img className='max-h-[14rem] w-full' src={handlePosterPath(element.poster_path)} alt={element.original_title} />
            <h1 className='mt-2 text-xs' title={element.title}>
              {handleFormatTitle(element.title)}
            </h1>
            <p className='text-xs mt-1'>{handleFormatToYear(element.release_date)}</p>

            <div className='flex justify-between items-center py-2'>
              <div className='flex items-center gap-2'>
                <img className='h-4' loading='lazy' src={IMDB} alt='IMDB image' />
                <p>{handleFormatVoteAverage(element.vote_average)}</p>
              </div>

              <div className='flex items-center gap-2'>
                <button>
                  <Eye />
                </button>
                <button>
                  <Heart />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='w-[2.5rem] bg-red-700 z-10'></div>
    </div>
  )
}

export default Featured
