import { Data } from './Movie'

type ImageProps = {
  data: Data
}

export const MovieImage: React.FC<ImageProps> = ({ data }) => {
  const url = 'https://image.tmdb.org/t/p/w500'

  return (
    <div className='max-w-[300px] w-full'>
      <img
        src={url + data.poster_path}
        alt={`A poster about: ${data.original_title}`}
      />
      <img src='' alt='' />
    </div>
  )
}
