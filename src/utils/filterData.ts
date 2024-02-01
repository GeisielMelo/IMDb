import { MovieData } from '../types/MovieData'
import { handleGetTitleName, handleGetTitlePoster, handleGetTitleVote } from './handleFunctionsUtils'

type Data = {
  id: number
  src: string
  title: string
  vote: number
  media: string
}

export const filterMovieDataArr = (elementArr: MovieData[]) => {
  const newArr: Data[] = []

  elementArr.forEach((element) => {
    const data = {
      id: element.id,
      media: element.media_type,
      title: handleGetTitleName(element),
      vote: handleGetTitleVote(element),
      src: handleGetTitlePoster(element),
    }
    newArr.push(data)
  })

  return newArr
}
