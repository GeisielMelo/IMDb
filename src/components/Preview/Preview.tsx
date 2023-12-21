import { MovieData } from '../../types/MovieData'
import { useMovies } from '../../context/MovieContext'
import { Heart } from 'lucide-react'
import IMDB from '../../assets/svg/IMDB.svg'

type Data = {
  elementData: MovieData
  setPreviewData: React.Dispatch<React.SetStateAction<MovieData | null>>
}

const Preview: React.FC<Data> = ({ setPreviewData, elementData }) => {
  const { movies, addMovie, removeMovie } = useMovies()

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

  const handleSetName = (element: MovieData) => {
    if (element.name) return element.name
    if (element.title) return element.title
    if (element.original_title) return element.original_title
    if (element.original_name) return element.original_name
  }

  const handleAlreadyAdded = (): boolean => {
    return movies.some((item:MovieData) => item.id === elementData.id)
  }

  const handleLikeMovie = () => {
    const alreadyExists = handleAlreadyAdded()
    return alreadyExists ? removeMovie(elementData) : addMovie(elementData)
  }

  return (
    <div className='fixed top-0 flex justify-center items-center h-[100dvh] w-screen z-30 backdrop-blur-md px-4'>
      <div className='relative max-w-[560px] md:max-w-[700px] md:flex p-8 rounded-lg shadow bg-white'>
        <img
          loading='lazy'
          className='hidden md:block	md:max-h-80 md:aspect-[9/16] md:object-cover'
          src={handlePosterPath(
            elementData.poster_path || elementData.backdrop_path,
          )}
          alt={handleSetName(elementData)}
        />
        {elementData.backdrop_path && (
          <img
            loading='lazy'
            className='md:hidden'
            src={handlePosterPath(elementData.backdrop_path)}
            alt={handleSetName(elementData)}
          />
        )}
        <div className='flex flex-col mt-4 md:ml-4 md:mt-0'>
          <h1 className='font-sans font-medium'>
            {handleSetName(elementData)}
            {' - '}
            {handleFormatToYear(
              elementData.release_date ?? elementData.first_air_date ?? '',
            )}
          </h1>

          <p className='py-4 mb-8'>{elementData.overview}</p>

          <>
            <div className='absolute bottom-8 flex gap-2'>
              <img loading='lazy' className='w-12' src={IMDB} alt='IMDB Logo' />
              <span>{handleFormatVoteAverage(elementData.vote_average)}</span>
            </div>
            <div className='absolute bottom-8 right-8 flex gap-2'>
              <button
                className='bg-transparent'
                onClick={() => handleLikeMovie()}
              >
                {handleAlreadyAdded() ? (
                  <Heart className={'text-red-600'} />
                ) : (
                  <Heart />
                )}
              </button>
            </div>
          </>
        </div>
        <button
          className='absolute w-4 h-4 top-2 right-2 rounded-[50%] text-sm bg-red-600'
          onClick={() => setPreviewData(null)}
        />
      </div>
    </div>
  )
}

export default Preview
