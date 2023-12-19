import { MovieData } from '../../types/MovieData'
import { Eye, Heart } from 'lucide-react'
import IMDB from '../../assets/svg/IMDB.svg'

type Data = {
  elementData: MovieData
  setPreviewData: React.Dispatch<React.SetStateAction<MovieData | null>>
}

const Preview: React.FC<Data> = ({ setPreviewData, elementData }) => {
  const handlePosterPath = (path: string | null | undefined): string => {
    const url = `https://image.tmdb.org/t/p/w500${path}`
    const notFoundUrl = '/backgroundNotFound.jpg'
    return path ? url : notFoundUrl
  }

  const handleFormatToYear = (date: string): string => {
    if (!date) ''
    return date.split('-')[0]
  }

  const handleFormatVoteAverage = (vote: number): string => {
    return Number(vote).toPrecision(2)
  }

  return (
    <div className='fixed top-0 flex justify-center items-center h-[100dvh] w-screen z-30 backdrop-blur-md px-4'>
      <div className='relative max-w-[560px] md:max-w-[700px] md:flex p-8 rounded-lg shadow bg-white'>
        <img
          loading='lazy'
          className='hidden md:block	md:max-h-80 md:aspect-[9/16] md:object-cover'
          src={handlePosterPath(elementData.poster_path || elementData.backdrop_path)}
          alt={elementData.name || elementData.title || elementData.original_title || elementData.original_name}
        />
        {elementData.backdrop_path && (
          <img
            loading='lazy'
            className='md:hidden'
            src={handlePosterPath(elementData.backdrop_path)}
            alt={elementData.name || elementData.title || elementData.original_title || elementData.original_name}
          />
        )}
        <div className='flex flex-col mt-4 md:ml-4 md:mt-0'>
          <h1 className='font-sans font-medium'>
            {elementData.name || elementData.title || elementData.original_title || elementData.original_name}
            {' - '}
            {handleFormatToYear(elementData.release_date ?? elementData.first_air_date ?? '')}
          </h1>

          <p className='py-4 mb-8'>{elementData.overview}</p>

          <>
            <div className='absolute bottom-8 flex gap-2'>
              <img loading='lazy' className='w-12' src={IMDB} alt='IMDB Logo' />
              <span>{handleFormatVoteAverage(elementData.vote_average)}</span>
            </div>
            <div className='absolute bottom-8 right-8 flex gap-2'>
              <button className='bg-transparent'>
                <Eye />
              </button>
              <button>
                <Heart />
              </button>
            </div>
          </>
        </div>
        <button
          className='absolute w-4 h-4 top-2 right-2 rounded-[50%] text-sm bg-red-500'
          onClick={() => setPreviewData(null)}
        />
      </div>
    </div>
  )
}

export default Preview
