import { useSwiper } from 'swiper/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const Prev: React.FC = () => {
  const swiper = useSwiper()
  return (
    <button
      className='absolute left-0 w-[1.8rem] h-full z-10 bg-transparent-silver bg-white'
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
      className='absolute right-0 w-[1.8rem] h-full z-10 bg-transparent-silver bg-white'
      onClick={() => swiper.slideNext()}
    >
      <ChevronRight />
    </button>
  )
}
