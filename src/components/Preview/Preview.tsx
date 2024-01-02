import { MovieData } from '../../types/MovieData'
import { useMovies } from '../../context/MovieContext'
import { Image } from './PreviewImage'
import { Info } from './PreviewInfo'

type Data = {
  elementData: MovieData
  setPreviewData: React.Dispatch<React.SetStateAction<MovieData | null>>
}

type LikeError = {
  message: string
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
    return movies.some((item: MovieData) => item.id === elementData.id)
  }

  const handleLikeMovie = () => {
    try {
      const alreadyExists = handleAlreadyAdded()
      alreadyExists ? removeMovie(elementData) : addMovie(elementData)
    } catch (error) {
      console.log(error)
      alert((error as LikeError).message)
    }
  }

  return (
    <div className='fixed top-0 flex justify-center items-center h-[100dvh] w-screen z-30 backdrop-blur-md px-4'>
      <div className='relative max-w-[560px] md:max-w-[700px] md:flex p-8 rounded-lg shadow bg-white'>
        <Image
          backdrop={handlePosterPath(elementData.backdrop_path)}
          poster={handlePosterPath(elementData.poster_path)}
          alt={handleSetName(elementData)}
        />
        <Info
          title={handleSetName(elementData)}
          year={handleFormatToYear(elementData.release_date ?? elementData.first_air_date ?? '')}
          description={elementData.overview}
          vote={handleFormatVoteAverage(elementData.vote_average)}
          onLike={() => handleLikeMovie()}
          added={handleAlreadyAdded()}
        />
        <button
          className='absolute w-4 h-4 top-2 right-2 rounded-[50%] text-sm bg-red-600'
          onClick={() => setPreviewData(null)}
        />
        <iframe width='420' height='315' src='https://www.youtube.com/embed/eI4an8aSsgw'></iframe>
      </div>
    </div>
  )
}

export default Preview
