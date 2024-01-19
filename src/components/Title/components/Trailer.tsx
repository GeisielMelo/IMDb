import { Youtube as YouTubeIcon } from 'lucide-react'
import { handleGetTitleKey, handleTitleHasVideo } from '../../../utils/handleFunctionsUtils'
import { useState } from 'react'
import YouTubePlayer from '../../Modal/YouTubePlayer'
import { useFetchTMDB } from '../../../hooks/useFetchTMDB'
import { VideosData } from '../../../types/VideosData'

type Trailer = {
  title: string
  locale: string
  type: string
  id: string | number
}

export const Trailer: React.FC<Trailer> = ({ title, locale, type, id }) => {
  const [showPlayer, setShowPlayer] = useState<boolean>(false)
  const url = `https://api.themoviedb.org/3/${type}/${id}/videos?language=${locale}`
  const { data, error, loading } = useFetchTMDB<VideosData>(url)

  if (error || !data) return null

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <button
            className='flex items-center justify-center rounded-[50%] px-1 py-2 text-white bg-[#032541]'
            onClick={() => setShowPlayer(true)}
            disabled={!handleTitleHasVideo(data)}
          >
            <YouTubeIcon className='h-4' />
          </button>
          {showPlayer && (
            <YouTubePlayer title={title} url={handleGetTitleKey(data)} onClose={() => setShowPlayer(!showPlayer)} />
          )}
        </>
      )}
    </>
  )
}
