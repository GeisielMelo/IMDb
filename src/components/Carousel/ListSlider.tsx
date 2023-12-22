import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { params } from '../../config/swiper'
import { register } from 'swiper/element/bundle'
import { MovieData } from '../../types/MovieData'
import { Prev, Next } from './Navigation'
// import { ImageSkeleton } from './Skeletons'
import Preview from '../Preview/Preview'
import 'swiper/css'
register()

type SliderTypes = {
  category: string
  data: MovieData[]
}

const ListSlider: React.FC<SliderTypes> = ({ category, data }) => {
  // const navigate = useNavigate()
  const [previewData, setPreviewData] = useState<MovieData | null>(null)

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
        {data.map((element, key) => (
          <SwiperSlide key={key}>
            <img
              onClick={() => handlePreviewClick(element)}
              className='px-[0.25rem] aspect-[9/13] hover:cursor-pointer'
              src={handlePosterPath(
                element.poster_path || element.backdrop_path,
              )}
              alt={element.original_title}
            />
          </SwiperSlide>
        ))}
        <Next />
      </Swiper>
      {previewData && handleReturnPreview(previewData)}
    </section>
  )
}

export default ListSlider
