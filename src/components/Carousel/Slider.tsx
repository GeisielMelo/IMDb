import { useMovies } from '../../context/MovieContext'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { params } from '../../config/swiper'
import { register } from 'swiper/element/bundle'
import { MovieData } from '../../types/MovieData'
import { Prev, Next } from './Navigation'
import { ImageSkeleton } from './Skeletons'
import { Card } from './Card'
import 'swiper/css'
import { useFetchTMDB } from '../../hooks/useFetchTMDB'
import { useDisplayAlert } from '../../hooks/useDisplayAlert'
import { useAuth } from '../../context/AuthContext'
register()

type SliderTypes = {
  category: string
  url: string
}

type ResultTypes = {
  results: MovieData[]
}

const Slider: React.FC<SliderTypes> = ({ category, url }) => {
  const navigate = useNavigate()
  const { Alert, displayAlert } = useDisplayAlert()
  const { data, loading, error } = useFetchTMDB<ResultTypes>(url)
  const { movies, addMovie, removeMovie } = useMovies()
  const { authenticated } = useAuth()

  if (error) navigate('/404')
  if (!data || !Array.isArray(data.results)) return
  const results: MovieData[] = data.results

  const handlePosterPath = (element: MovieData): string => {
    const path = element.poster_path
    const url = `https://image.tmdb.org/t/p/w500${path}`
    const notFoundUrl = '/backgroundNotFound.jpg'
    return path ? url : notFoundUrl
  }

  const handleFormatVoteAverage = (element: MovieData): string => {
    if (element.vote_average === 0) return 'Upcoming'
    else return Number(element.vote_average).toPrecision(2)
  }

  const handleSetName = (element: MovieData) => {
    if (element.name) return element.name
    if (element.title) return element.title
    if (element.original_title) return element.original_title
    if (element.original_name) return element.original_name
  }

  const handleAlreadyAdded = (element: MovieData): boolean => {
    return movies.some((item: MovieData) => item.id === element.id)
  }

  const handleLikeMovie = (element: MovieData) => {
    if (!authenticated) {
      displayAlert('You must be connected to perform this action.', 'info')
    }

    const alreadyExists = handleAlreadyAdded(element)
    alreadyExists ? removeMovie(element) : addMovie(element)
  }

  const handleRedirect = (element: MovieData) => {
    if (element.media_type === 'tv') {
      return navigate(`/tv/${element.id}`)
    } else {
      return navigate(`/movie/${element.id}`)
    }
  }

  return (
    <div className='my-8'>
      <h1 className='pl-8 font-sans font-medium'>{category}</h1>
      <Swiper {...params} className='px-8 relative flex'>
        <Prev />
        {loading ? (
          <>
            {[...Array(8)].map((_, index) => (
              <SwiperSlide key={index}>
                <ImageSkeleton />
              </SwiperSlide>
            ))}
          </>
        ) : (
          <>
            {results.map((element, key) => (
              <SwiperSlide key={key}>
                <Card
                  handleRedirect={() => handleRedirect(element)}
                  handleWatch={() => handleLikeMovie(element)}
                  src={handlePosterPath(element)}
                  alt={handleSetName(element)}
                  title={handleSetName(element)}
                  note={handleFormatVoteAverage(element)}
                  added={handleAlreadyAdded(element)}
                  watchList={true}
                />
              </SwiperSlide>
            ))}
          </>
        )}
        <Next />
      </Swiper>
      <Alert />
    </div>
  )
}

export default Slider
