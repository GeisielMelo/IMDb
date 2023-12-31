import { options } from '../../config/themoviedb'
import { useFetchData } from '../../hooks/useFetchData'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Release } from './Release'

type MovieProps = {
  id?: string
}

const Movie: React.FC<MovieProps> = ({ id }) => {
  const navigate = useNavigate()
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`
  const { data, loading, error } = useFetchData(url, options)

  if (error) navigate('/404')

  return loading ? (
    <p>loading</p>
  ) : (
    <div
      className={`flex justify-center py-8 px-8 bg-no-repeat bg-cover`}
      style={{
        backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${data.backdrop_path}`,
        backgroundPosition: 'left calc((50vw - 170px) - 340px) top',
      }}
    >
      <div className='max-w-[1300px] w-full flex'>
        <div className='min-w-[300px]'>
          <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt='' />
          <img src='' alt='' />
        </div>

        <div className='flex flex-col justify-center px-8 gap-4'>
          <div>
            <h1>
              {data.original_title}
              <span>{data.release_date}</span>
            </h1>

            <ul className='flex gap-4'>
              <Release id={id} />
              <li>{data.genres.map((i) => i.name)}</li>
              <li>{data.runtime}</li>
            </ul>
          </div>

          <div className='flex'>
            <div>
              <p>{data.vote_average}</p>
            </div>
            <button>
              <Plus />{' '}
            </button>
            <button>Trailer</button>
          </div>

          <p>{data.tagline}</p>
          <p>{data.overview}</p>
        </div>
      </div>
    </div>
  )
}

export default Movie
