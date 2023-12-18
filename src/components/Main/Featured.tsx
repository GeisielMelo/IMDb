import { useState } from 'react'
import information from '../../jsons/searched.json'
// import IMDB from '../../assets/svg/IMDB.svg'
// import { Eye, Heart } from 'lucide-react'

type Data = {
  backdrop_path: string | null
  poster_path: string | null
  original_language: string
  original_title: string
  overview: string
  release_date: string
  title: string
  video: boolean
  adult: boolean
  genre_ids: number[]
  vote_average: number
  vote_count: number
  popularity: number
}

const Featured: React.FC = () => {
  const [translate, setTranslate] = useState(0);
  const data: Data[] = information.results

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


  const handlePrev = () => {
    setTranslate((prev) => Math.max(prev - 100, 0));
  };

  const handleNext = () => {
    setTranslate((prev) => prev + 100);
  };


  return (
    <>
    <p>{translate}</p>
    <div className='flex justify-center overflow-hidden'>
      <div onClick={handlePrev} className='w-[2.5rem] border-solid border-2 border-sky-500  z-10'>{'<'}</div>

      <div className={`flex w-[calc(100%-5rem)] translate-x-[-${translate}.0%] transition-transform duration-500`}>
        {data.map((element, key) => (
          <img
            key={key}
            className='w-[33.3%] sm:w-[25%] md:w-[20%] lg:w-[14.29%] xl:w-[12.5%] aspect-[9/16] px-[.25rem] object-cover'
            src={handlePosterPath(element.poster_path)}
            alt={element.original_title}
          />
        ))}
      </div>

      <div onClick={handleNext} className='w-[2.5rem] border-solid border-2 border-sky-500  z-10'>{'>'}</div>
    </div>
    </>
  )
}

export default Featured
