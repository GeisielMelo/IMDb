import Navigation from '../../components/Header/Navigation'
import Title from '../../components/Title/Title'
import Footer from '../../components/Footer/Footer'
import { useParams } from 'react-router-dom'
import { useFetchTMDB } from '../../hooks/useFetchTMDB'
import { ReleaseData } from '../../types/ReleaseData'
import { TitleData } from '../../types/TitleData'
import { CreditsData } from '../../types/CreditsData'
import { ReviewsData } from '../../types/ReviewsData'
import { VideosData } from '../../types/VideosData'
import { SimilarData } from '../../types/SimilarData'
import NotFound from '../../components/Error/NotFound'
import { LoadingSpinner } from '../../components/animated/LoadingSpinner'
import { useLanguages } from '../../hooks/useLanguages'

type IParams = {
  id?: string
  type?: string
}

const Titles: React.FC = () => {
  const params = useParams<IParams>()
  const { locale } = useLanguages()
  const { type, id } = params

  const urls = {
    data: `https://api.themoviedb.org/3/${type}/${id}?language=${locale}`,
    release: `https://api.themoviedb.org/3/${type}/${id}/release_dates`,
    credits: `https://api.themoviedb.org/3/${type}/${id}/credits?language=${locale}`,
    reviews: `https://api.themoviedb.org/3/${type}/${id}/reviews?language=${locale}&page=1`,
    similar: `https://api.themoviedb.org/3/${type}/${id}/similar?language=${locale}&page=1`,
    videos: `https://api.themoviedb.org/3/${type}/${id}/videos?language=${locale}`,
  }

  const {
    data: title,
    loading: titleLoading,
    error: titleError,
  } = useFetchTMDB<TitleData>(urls.data)
  const {
    data: release,
    loading: releaseLoading,
    error: releaseError,
  } = useFetchTMDB<ReleaseData>(urls.release)
  const {
    data: credits,
    loading: creditsLoading,
    error: creditsError,
  } = useFetchTMDB<CreditsData>(urls.credits)
  const {
    data: reviews,
    loading: reviewsLoading,
    error: reviewsError,
  } = useFetchTMDB<ReviewsData>(urls.reviews)
  const {
    data: similar,
    loading: similarLoading,
    error: similarError,
  } = useFetchTMDB<SimilarData>(urls.similar)
  const {
    data: videos,
    loading: videosLoading,
    error: videosError,
  } = useFetchTMDB<VideosData>(urls.videos)

  const loading =
    titleLoading ||
    releaseLoading ||
    creditsLoading ||
    reviewsLoading ||
    similarLoading ||
    videosLoading

  const error =
    titleError ||
    releaseError ||
    creditsError ||
    reviewsError ||
    similarError ||
    videosError

  if (loading) {
    return (
      <>
        <Navigation />
        <div className='flex items-center justify-center h-[100dvh]'>
          <LoadingSpinner />
        </div>
        <Footer />
      </>
    )
  }

  if (error) {
    return (
      <>
        <Navigation />
        <NotFound />
        <Footer />
      </>
    )
  }

  if (!title || !release || !credits || !reviews || !similar || !videos)
    return null

  return (
    <>
      <Navigation />
      <Title
        title={title}
        release={release}
        credits={credits}
        reviews={reviews}
        similar={similar}
        videos={videos}
        loading={loading}
      />
      <Footer />
    </>
  )
}

export default Titles
