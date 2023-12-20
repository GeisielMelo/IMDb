import information from '../../jsons/searched.json'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { register } from 'swiper/element/bundle'
import { MovieData } from '../../types/MovieData'
import { Prev, Next } from './Navigation'
import { ImageSkeleton } from './Skeletons'
import Preview from '../Preview/Preview'
import 'swiper/css'
register()

type SliderTypes = {
  category: string
  url: string
}

const Slider: React.FC<SliderTypes> = ({ category, url }) => {
  const [previewData, setPreviewData] = useState<MovieData | null>(null)
  const data: MovieData[] = information.results
  const loading = true

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

  const handlePreviewClick = (elementData: MovieData) => {
    setPreviewData(elementData)
  }

  const handleReturnPreview = (elementData: MovieData) => (
    <Preview setPreviewData={setPreviewData} elementData={elementData} />
  )

  return (
    <section className='pt-8'>
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
                <img
                  onClick={() => handlePreviewClick(element)}
                  className='px-[0.25rem] aspect-[9/13] hover:cursor-pointer'
                  src={handlePosterPath(element.poster_path || element.backdrop_path)}
                  alt={element.original_title}
                />
              </SwiperSlide>
            ))}
          </>
        )}
        <Next />
      </Swiper>
      {previewData && handleReturnPreview(previewData)}
    </section>
  )
}

export default Slider
