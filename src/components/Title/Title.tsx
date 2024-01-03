import TitleReviews from './TitleReviews'
import TitleCredits from './TitleCredits'
import { TitleImage } from './TitleImage'
import { TitleInfo } from './TitleInfo'
import { TitleData } from './types/TitleData'
import { ReleaseData } from './types/ReleaseData'
import { CreditsData } from './types/CreditsData'
import { VideosData } from './types/VideosData'
import { ReviewsData } from './types/ReviewsData'

type TitleProps = {
  title: TitleData
  release: ReleaseData
  credits: CreditsData
  reviews: ReviewsData
  similar: object
  videos: VideosData
}

const Title: React.FC<TitleProps> = ({ title, release, credits, reviews, similar, videos }) => {
  console.log(similar)

  const bgUrl = 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces'
  return (
    <>
      <section className='mt-16'>
        <div
          className='flex justify-center py-8 px-8 bg-no-repeat bg-cover'
          style={{
            backgroundImage: `linear-gradient(to bottom right, rgba(31.5, 10.5, 10.5, 1), rgba(31.5, 10.5, 10.5, 0.84)), url(${
              bgUrl + title.backdrop_path
            })`,
          }}
        >
          <div className='max-w-5xl max-h-[510px] w-full flex'>
            <TitleImage title={title} />
            <div className='hidden md:block'>
              <TitleInfo title={title} release={release} videos={videos} />
            </div>
          </div>
        </div>
        <div className='md:hidden py-4 bg-slate-700'>
          <TitleInfo title={title} release={release} videos={videos} />
        </div>
      </section>

      <section className='flex justify-center p-8'>
        <TitleCredits credits={credits} />
      </section>

      <section className='flex justify-center p-8'>
        <TitleReviews reviews={reviews} />
      </section>
    </>
  )
}

export default Title
