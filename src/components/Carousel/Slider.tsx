import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { params } from '../../config/swiper'
import { register } from 'swiper/element/bundle'
import { MovieData } from '../../types/MovieData'
import { Prev, Next } from './Navigation'
import { Card } from '../Card/Card'
import { useFetchTMDB } from '../../hooks/useFetchTMDB'
import { handleGetTitleName, handleGetTitlePoster, handleGetTitleVote } from '../../utils/handleFunctionsUtils'
import { CardSkeleton } from './Skeleton'
register()

type SliderTypes = {
  category: string
  url: string
  sectionName: string
}

type ResultTypes = {
  results: MovieData[]
}

const Slider: React.FC<SliderTypes> = ({ sectionName, category, url }) => {
  const { data, error, loading } = useFetchTMDB<ResultTypes>(url)

  if (error || !data) return null

  const results = data.results

  if (!results.length) return null

  return (
    <section id={sectionName} className='my-8'>
      <h1 className='pl-8 mb-2 font-sans font-semibold text-lg'>{category}</h1>
      <Swiper {...params} className='px-8 grid grid-cols-1'>
        <Prev />
        {loading ? (
          <>
            {[...Array(8)].map((_, index) => (
              <SwiperSlide key={index}>
                <CardSkeleton />
              </SwiperSlide>
            ))}
          </>
        ) : (
          <>
            {results.map((element, key) => (
              <SwiperSlide key={key}>
                <div className='mx-[0.25rem]'>
                  <Card
                    key={key}
                    id={element.id}
                    src={handleGetTitlePoster(element)}
                    title={handleGetTitleName(element)}
                    vote={handleGetTitleVote(element)}
                    media={element.media_type}
                    element={element}
                  />
                </div>
              </SwiperSlide>
            ))}
          </>
        )}
        <Next />
      </Swiper>
    </section>
  )
}

export default Slider
