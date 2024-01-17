import { Menu as MenuIcon, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Watchlist } from './Watchlist'
import { internalLinkClick } from '../../utils/handleFunctions'

export const Menu: React.FC = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  
  const handleInternalLink = (url:string) => {
    if (isOpen) {
      setIsOpen(false)
      internalLinkClick(url)
    } else {
      internalLinkClick(url)
    }
  }

  return (
    <>
      <div className='flex flex-row-reverse items-center md:flex-row'>
        <h1 className='px-2 py-1 rounded cursor-pointer bg-[#032541]' onClick={() => navigate('/')}>
          TMDb
        </h1>
        <button className='flex px-4 py-1 gap-1' onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <MenuIcon />}
          <span className='hidden md:block'>Menu</span>
        </button>
      </div>

      <div
        className={`absolute top-14 left-0 px-4 z-10 bg-[rgba(18,18,18,255)] rounded-br-lg transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ul className='flex flex-col gap-2 py-2'>
          <li className='cursor-pointer' onClick={() => handleInternalLink('/#trending')}>Trending</li>
          <li className='cursor-pointer' onClick={() => handleInternalLink('/#upcoming')}>Upcoming</li>
          <li className='cursor-pointer' onClick={() => handleInternalLink('/#movies')}>Movies</li>
          <li className='cursor-pointer' onClick={() => handleInternalLink('/#tv-show')}>Tv Show</li>
          <li className='block md:hidden'><Watchlist /></li>
        </ul>
      </div>
    </>
  )
}
