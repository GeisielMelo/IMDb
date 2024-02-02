import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { params } from '../../config/swiper'
import { register } from 'swiper/element/bundle'
import { Prev, Next } from './Navigation'
import { Card } from '../Card/Card'
import { CardSkeleton } from './Skeleton'
import { filterMovieDataArr } from '../../utils/filterData'
import { useFetchCategory } from '../../hooks/useFetchCategory'
import { MovieData } from '../../types/MovieData'
register()

type SliderTypes = {
  category: string
  url: string
  sectionName: string
}

const Slider: React.FC<SliderTypes> = ({ sectionName, category, url }) => {
  const { data, error, loading } = useFetchCategory<MovieData[]>(url)

  if (error) return null

  return (
    <section id={sectionName} className='my-8'>
      <h1 className='ml-8 mb-4 px-4 py-0.5 font-sans font-semibold text-lg border border-black rounded-full max-w-max'>
        {category}
      </h1>
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
            {data && (
              <>
                {filterMovieDataArr(data).map((element, key) => (
                  <SwiperSlide key={key}>
                    <div className='mx-[0.25rem]'>
                      <Card
                        key={key}
                        id={element.id}
                        src={element.src}
                        title={element.title}
                        vote={element.vote}
                        media={element.media}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </>
            )}
          </>
        )}
        <Next />
      </Swiper>
    </section>
  )
}

export default Slider
