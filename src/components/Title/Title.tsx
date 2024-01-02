import { TitleImage } from './TitleImage'
import { TitleInfo } from './TitleInfo'

import { TitleData } from './types/TitleData'
import { ReleaseData } from './types/ReleaseData'

type TitleProps = {
  title: TitleData
  release: ReleaseData
  credits: object
  reviews: object
  similar: object
  videos: object
}

const Title: React.FC<TitleProps> = ({ title, release, credits, reviews, similar, videos }) => {
  console.log(credits)
  console.log(reviews)
  console.log(similar)
  console.log(videos)

  const bgUrl = 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces'
  return (
    <>
      <div
        className='flex justify-center py-8 px-8 bg-no-repeat bg-cover'
        style={{
          backgroundImage: `linear-gradient(to bottom right, rgba(31.5, 10.5, 10.5, 1), rgba(31.5, 10.5, 10.5, 0.84)), url(${
            bgUrl + title.backdrop_path
          })`,
        }}
      >
        <div className='max-w-[1300px] max-h-[510px] flex'>
          <TitleImage title={title} />
          <div className='hidden md:block'>
            <TitleInfo title={title} release={release} />
          </div>
        </div>
      </div>
      <div className='md:hidden py-4 bg-slate-700'>
        <TitleInfo title={title} release={release} />
      </div>
    </>
  )
}

export default Title
