import { useMovies } from '../../context/MovieContext'
import { Swiper, SwiperSlide } from 'swiper/react'
import { params } from '../../config/swiper'
import { register } from 'swiper/element/bundle'
import { MovieData } from '../../types/MovieData'
import { Prev, Next } from './Navigation'
import { ImageSkeleton } from './Skeletons'
import { Card } from './Card'
import 'swiper/css'
import { useNavigate, useParams } from 'react-router-dom'
register()

type SliderTypes = {
  category: string
  data: MovieData[]
  loading: boolean
  watchList: boolean
}

type IParams = {
  id?: string
  type?: string
}

const ListSlider: React.FC<SliderTypes> = ({ category, data, loading, watchList }) => {
  const navigate = useNavigate()
  const q = useParams<IParams>()
  const { movies, addMovie, removeMovie } = useMovies()

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
    try {
      const alreadyExists = handleAlreadyAdded(element)
      alreadyExists ? removeMovie(element) : addMovie(element)
    } catch (error) {
      console.log(error)
      alert((error as Error).message)
    }
  }

  const handleRedirect = (element: MovieData) => {
    if (element.media_type) {
      if (element.media_type === 'tv') {
        return navigate(`/tv/${element.id}`)
      } else {
        return navigate(`/movie/${element.id}`)
      }
    } else {
      if (q.type === 'tv') {
        return navigate(`/tv/${element.id}`)
      } else {
        return navigate(`/movie/${element.id}`)
      }
    }
  }

  return (
    <div className='pt-8'>
      <h1 className='mb-4 pl-8 font-sans font-medium'>{category}</h1>
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
            {data.map((element, key) => (
              <SwiperSlide key={key}>
                <Card
                  handleRedirect={() => handleRedirect(element)}
                  handleWatch={() => handleLikeMovie(element)}
                  src={handlePosterPath(element)}
                  alt={element.original_title}
                  title={handleSetName(element)}
                  note={handleFormatVoteAverage(element)}
                  added={handleAlreadyAdded(element)}
                  watchList={watchList}
                />
              </SwiperSlide>
            ))}
          </>
        )}
        <Next />
      </Swiper>
    </div>
  )
}

export default ListSlider
