import { BookmarkPlus as BookmarkPlusIcon } from 'lucide-react'

export const Watchlist: React.FC = () => {
  return (
    <button className='hidden md:flex ml-2'>
      <BookmarkPlusIcon />
      <span>Watchlist</span>
    </button>
  )
}
