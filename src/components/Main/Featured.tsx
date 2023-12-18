import information from '../../jsons/searched.json'
import { Swiper, SwiperSlide } from 'swiper/react'
import { register } from 'swiper/element/bundle'
import { Prev, Next } from './Navigation'
import 'swiper/css'
register()

type Data = {
  backdrop_path?: string | null
  poster_path: string | null
  original_language: string
  original_title?: string
  original_name?: string
  overview: string
  release_date?: string
  title?: string
  video?: boolean
  adult: boolean
  genre_ids: number[]
  vote_average: number
  vote_count: number
  popularity: number
}

const Featured: React.FC = () => {
  const data: Data[] = information.results

  const params = {
    navigation: true,
    breakpoints: {
      200: { slidesPerView: 3 },
      475: { slidesPerView: 4 },
      640: { slidesPerView: 5 },
      768: { slidesPerView: 6 },
      1024: { slidesPerView: 7 },
      1280: { slidesPerView: 8 },
    },
  }

  if (!data || !Array.isArray(data)) {
    return
  }

  const handlePosterPath = (path: string | null): string => {
    const url = `https://image.tmdb.org/t/p/w500${path}`
    const notFoundUrl = '/backgroundNotFound.jpg'
    return path ? url : notFoundUrl
  }

  // const handleFormatToYear = (date: string): string => {
  //   return date.split('-')[0]
  // }

  // const handleFormatVoteAverage = (vote: number): string => {
  //   return Number(vote).toPrecision(2)
  // }

  // const handleFormatTitle = (title: string): string => {
  //   return title.slice(0, 25) + '...'
  // }

  return (
    <Swiper {...params} className='px-8 relative flex'>
      <Prev />
      {data.map((element, key) => (
        <SwiperSlide key={key}>
          <img
            onClick={() => console.log(element.original_title || 'n tem')}
            className='px-[0.25rem] aspect-[9/13]'
            src={handlePosterPath(element.poster_path)}
            alt={element.original_title}
          />
        </SwiperSlide>
      ))}
      <Next />
    </Swiper>
  )
}

export default Featured
