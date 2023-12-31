import { useNavigate } from 'react-router-dom'
import { useFetchMovie } from '../../hooks/useFetchMovie'
import { Plus } from 'lucide-react'

type MovieProps = {
  id?: string
}

type MovieTypes = {
  original_title: string
  release_date: string
  genres : string[]

  runtime: string
  vote_average:string
  tagline: string
  overview: string
}

const Movie: React.FC<MovieProps> = ({ id }) => {
  const navigate = useNavigate()
  const { movie, release, loading, error } = useFetchMovie<MovieTypes>(id)

  if (error) navigate('/404')
  if (!movie || !release) return

  const releaseInfo = release?.results.find((_) => _.iso_3166_1 === 'BR')
  if (!releaseInfo) return
  const { release_dates } = releaseInfo

  return loading ? (
    <p>loading</p>
  ) : (
    <div
      className={`flex justify-center py-8 px-8 bg-no-repeat bg-cover`}
      style={{
        backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}`,
      }}
    >
      <div className='max-w-[1300px] max-h-[510px] flex'>
        <div className='max-w-[300px] w-full'>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt=''
          />
          <img src='' alt='' />
        </div>

        <div className='flex flex-col justify-center px-8 gap-4'>
          <div>
            <h1>
              {movie.original_title}
              <span>{movie.release_date}</span>
            </h1>

            <ul className='flex gap-4'>
              <li>{release_dates.map((_) => _.certification)}</li>
              <li>{release_dates.map((_) => _.release_date)}</li>
              <li>{movie.genres.map((i) => i.name)}</li>
              <li>{movie.runtime}</li>
            </ul>
          </div>

          <div className='flex'>
            <div>
              <p>{movie.vote_average}</p>
            </div>
            <button>
              <Plus />
            </button>
            <button>Trailer</button>
          </div>

          <p>{movie.tagline}</p>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  )
}

export default Movie
