import { useFetchData } from '../../hooks/useFetchData'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { params } from '../../config/swiper'
import { register } from 'swiper/element/bundle'
import { MovieData } from '../../types/MovieData'
import { Prev, Next } from './Navigation'
import { ImageSkeleton } from './Skeletons'
import { Image } from './Image'
import Preview from '../Preview/Preview'
import 'swiper/css'
register()

type SliderTypes = {
  category: string
  url: string
  options?: object
}

type ResultTypes = {
  results: MovieData[]
}

const Slider: React.FC<SliderTypes> = ({ category, url, options }) => {
  const navigate = useNavigate()
  const [previewData, setPreviewData] = useState<MovieData | null>(null)
  const { data, loading, error } = useFetchData<ResultTypes>(url, options)

  if (error) navigate('/404')
  if (!data || !Array.isArray(data.results)) return
  const results: MovieData[] = data.results

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
            {results.map((element, key) => (
              <SwiperSlide key={key}>
                <Image
                  onClick={() => handlePreviewClick(element)}
                  src={handlePosterPath(
                    element.poster_path || element.backdrop_path,
                  )}
                  alt={element.original_title}
                />
              </SwiperSlide>
            ))}
          </>
        )}
        <Next />
      </Swiper>
      {previewData && handleReturnPreview(previewData)}
    </div>
  )
}

export default Slider
