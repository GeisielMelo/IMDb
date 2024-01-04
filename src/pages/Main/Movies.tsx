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

type IParams = {
  id?: string
}

const Movies: React.FC = () => {
  const params = useParams<IParams>()
  const locale: string = navigator.language
  const id = params.id

  const urls = {
    data: `https://api.themoviedb.org/3/movie/${id}?language=${locale}`,
    release: `https://api.themoviedb.org/3/movie/${id}/release_dates`,
    credits: `https://api.themoviedb.org/3/movie/${id}/credits?language=${locale}`,
    reviews: `https://api.themoviedb.org/3/movie/${id}/reviews?language=${locale}&page=1`,
    similar: `https://api.themoviedb.org/3/movie/${id}/similar?language=${locale}&page=1`,
    videos: `https://api.themoviedb.org/3/movie/${id}/videos?language=${locale}`,
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

  if (loading) {
    return <>Loading</>
  }

  if (titleError || releaseError || creditsError || reviewsError || similarError || videosError) {
    return <>Error</>
  }

  if (!title || !release || !credits || !reviews || !similar || !videos) return null

  // if (!title.success) {
  //   return <>Not Found</>
  // }

  return (
    <>
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
    </>
  )
}

export default Movies
