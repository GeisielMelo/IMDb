import { BookmarkPlus as BookmarkPlusIcon } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const Watchlist: React.FC = () => {
  const navigate = useNavigate()
  const { authenticated } = useAuth()

  const handleNavigateToWatchlist = () => {
    return authenticated ? navigate('/my-list') : navigate('/sign-in')
  }

  return (
    <button className='flex' onClick={() => handleNavigateToWatchlist()}>
      <span className='hidden md:block'><BookmarkPlusIcon /></span>
      <span>Watchlist</span>
    </button>
  )
}
