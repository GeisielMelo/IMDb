import { MovieRelease } from './MovieRelease'
import { Plus } from 'lucide-react'
import { Data } from './Movie'

type InfoProps = {
  id?: string
  data: Data
}

export const MovieInfo: React.FC<InfoProps> = ({ id, data }) => {
  return (
    <div className='flex flex-col justify-center px-8 gap-4'>
      <div>
        <h1>
          {data.original_title}
          <span>{data.release_date}</span>
        </h1>

        <MovieRelease id={id} />

        <ul className='flex gap-4'>
          <li>{data.genres.map((i) => i.name)}</li>
          <li>{data.runtime}</li>
        </ul>
      </div>

      <div className='flex'>
        <div>
          <p>{data.vote_average}</p>
        </div>
        <button>
          <Plus />
        </button>
        <button>Trailer</button>
      </div>

      <p>{data.tagline}</p>
      <p>{data.overview}</p>
    </div>
  )
}
