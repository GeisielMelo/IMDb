import { useSwiper } from 'swiper/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const Prev: React.FC = () => {
  const swiper = useSwiper()
  return (
    <button
      className='absolute left-0 w-[1.8rem] h-full z-10 rounded-br rounded-tr bg-black/30 text-transparent hover:text-zinc-300 hover:bg-black/50 transition-all'
      onClick={() => swiper.slidePrev()}
    >
      <ChevronLeft />
    </button>
  )
}

export const Next: React.FC = () => {
  const swiper = useSwiper()
  return (
    <button
      className='absolute right-0 w-[1.8rem] h-full z-10 rounded-bl rounded-tl bg-black/30 text-transparent hover:text-zinc-300 hover:bg-black/50 transition-all'
      onClick={() => swiper.slideNext()}
    >
      <ChevronRight />
    </button>
  )
}
