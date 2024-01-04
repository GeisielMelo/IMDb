import { TitleData } from '../../types/TitleData'

type ImageProps = {
  title: TitleData
}

export const TitleImage: React.FC<ImageProps> = ({ title }) => {
  const url = 'https://image.tmdb.org/t/p/w500'

  return (
    <div className='max-w-[200px] md:max-w-[300px] w-full'>
      <img
        className='rounded-lg shadow-lg md:rounded-none'
        src={url + title.poster_path}
        alt={`A poster about: ${title.original_title}`}
      />
      <img src='' alt='' />
    </div>
  )
}
