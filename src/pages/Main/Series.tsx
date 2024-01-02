import Navigation from '../../components/Header/Navigation'
import Title from '../../components/Title/Title'
import Footer from '../../components/Footer/Footer'
import { useParams } from 'react-router-dom'
import { useFetchTMDB } from '../../hooks/useFetchTMDB'
import { ReleaseData } from '../../components/Title/types/ReleaseData'
import { TitleData } from '../../components/Title/types/TitleData'

type IParams = {
  id?: string
}

const Series: React.FC = () => {
  const params = useParams<IParams>()
  const locale: string = navigator.language
  const id = params.id

  const urls = {
    data: `https://api.themoviedb.org/3/tv/${id}?language=${locale}`,
    release: `https://api.themoviedb.org/3/tv/${id}/release_dates`,
    credits: `https://api.themoviedb.org/3/tv/${id}/credits?language=${locale}`,
    reviews: `https://api.themoviedb.org/3/tv/${id}/reviews?language=${locale}&page=1`,
    similar: `https://api.themoviedb.org/3/tv/${id}/similar?language=${locale}&page=1`,
    videos: `https://api.themoviedb.org/3/tv/${id}/videos?language=${locale}`,
  }

  const { data: title, loading: titleLoading, error: titleError } = useFetchTMDB<TitleData>(urls.data)
  const { data: release, loading: releaseLoading, error: releaseError } = useFetchTMDB<ReleaseData>(urls.release)
  const { data: credits, loading: creditsLoading, error: creditsError } = useFetchTMDB<object>(urls.credits)
  const { data: reviews, loading: reviewsLoading, error: reviewsError } = useFetchTMDB<object>(urls.reviews)
  const { data: similar, loading: similarLoading, error: similarError } = useFetchTMDB<object>(urls.similar)
  const { data: videos, loading: videosLoading, error: videosError } = useFetchTMDB<object>(urls.videos)

  if (titleLoading || releaseLoading || creditsLoading || reviewsLoading || similarLoading || videosLoading) {
    return <>Loading</>
  }

  if (titleError || releaseError || creditsError || reviewsError || similarError || videosError) {
    return <>Error</>
  }

  if (!title || !release || !credits || !reviews || !similar || !videos) return null

  return (
    <>
      <Navigation />
      <section className='mt-16'>
        <Title title={title} release={release} credits={credits} reviews={reviews} similar={similar} videos={videos} />
      </section>
      <Footer />
    </>
  )
}

export default Series
