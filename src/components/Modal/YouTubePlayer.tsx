import { X } from 'lucide-react'

type PlayerProps = {
  title: string
  url: string
  onClose: () => void
}

const YouTubePlayer: React.FC<PlayerProps> = ({ title, url, onClose }) => {
  const youTubeUrl = `https://www.youtube.com/embed/`

  return (
    <main
      onClick={() => onClose()}
      className='flex items-center justify-center w-screen h-screen fixed top-0 right-0 z-20 bg-transparent-black p-8'
    >
      <div className='flex flex-col max-w-[640px] max-h-[480px] w-full h-full'>
        <div className='flex justify-between w-full my-2 text-white font-semibold'>
          <h1>{title ? title : 'Player'}</h1>
          <button className='hover:text-red-700' onClick={() => onClose()}>
            <X />
          </button>
        </div>

        <iframe
          className='aspect-[16/9] w-full h-full'
          src={youTubeUrl + url}
        ></iframe>
      </div>
    </main>
  )
}

export default YouTubePlayer
