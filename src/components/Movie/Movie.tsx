import { useNavigate } from 'react-router-dom'
import { MovieSkeleton } from './Skeletons'
import { useFetchTMDB } from '../../hooks/useFetchTMDB'
import { MovieImage } from './MovieImage'
import { MovieInfo } from './MovieInfo'

type MovieProps = {
  id?: string
}

export type Data = {
  genres: { [key: string]: string }[]
  original_title: string
  release_date: string
  backdrop_path: string
  poster_path: string
  runtime: string
  vote_average: string
  tagline: string
  overview: string
}

const Movie: React.FC<MovieProps> = ({ id }) => {
  const navigate = useNavigate()
  const locale: string = navigator.language
  const url = `https://api.themoviedb.org/3/movie/${id}?language=${locale}`
  const bgUrl = 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces'
  const { data, loading, error } = useFetchTMDB<Data>(url)

  if (loading) return <MovieSkeleton />
  if (error) navigate('/404')
  if (!data) return

  return (
    <div
      className={`flex justify-center py-8 px-8 bg-no-repeat bg-cover`}
      style={{
        backgroundImage: `url(${bgUrl + data.backdrop_path}`,
      }}
    >
      <div className='max-w-[1300px] max-h-[510px] flex'>
        <MovieImage data={data} />
        <MovieInfo data={data} id={id} />
      </div>
    </div>
  )
}

export default Movie
