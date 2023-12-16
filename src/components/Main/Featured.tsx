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

  return (
    <div>
      <h1>Session Title</h1>
      <div className='flex py-4 gap-4 rounded-md'>
        {data.map((element, key) => (
          <div key={key}>
            <div className='w-44 h-64'>
              <img className='w-full h-full object-cover rounded-md' src={handlePosterPath(element.poster_path)} alt={element.original_title} />
            </div>

            <h1 className='mt-2' title={element.title}>{element.title}</h1>
            <p>{element.release_date}</p>
            <div className='flex justify-between items-center py-2'>
              <div className='flex items-center gap-2'>
                <img className='h-4' src={IMDB} alt='IMDB image' />
                <p>{element.vote_average}</p>
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
    </div>
  )
}

export default Featured
