import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { SearchBar } from './SearchBar'
import { Menu, X, LogOut, Search, BookmarkPlus, Languages } from 'lucide-react'
import logo from '../../assets/svg/logo.svg'
import { NavigationFlex, NavigationBox } from './NavigationMenu'

const Navigation: React.FC = () => {
  const navigate = useNavigate()
  const { authenticated, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)

  return (
    <nav className='flex items-center justify-center w-full text-md px-2 bg-black text-white'>
      
      <div className='flex items-center max-w-7xl w-full my-3 gap-2'>
        <div className='flex flex-row-reverse items-center md:flex-row'>
          <h1 className='px-2 rounded'>TMDb</h1>
          <button className='flex px-4 py-1 gap-1'>
            <Menu />
            <span className='hidden md:block'>Menu</span>
          </button>
        </div>

        <div className='w-full flex rounded justify-end md:justify-normal bg-transparent md:bg-white'>
          <input className='hidden md:block w-full rounded-l' type='text' name='search' />
          <button className='hidden md:block mx-4 my-1 text-zinc-500'>
            <Search />
          </button>
          <button className='block md:hidden'>
            <Search />
          </button>
        </div>

        <button className='hidden md:flex ml-2'>
          <BookmarkPlus />
          <span>Watchlist</span>
        </button>

        <button
          className='px-4 text-md whitespace-nowrap'
          onClick={() => (authenticated ? logout() : navigate('/sign-in'))}
        >
          {authenticated ? <span>Sign Out</span> : <span>Sign In</span>}
        </button>

        <select className='hidden md:block border-none bg-black text-white'>
          <option value='en-US'>EN</option>
          <option value='pt-BR'>PT</option>
        </select>
      </div>
    </nav>
  )
}
export default Navigation
