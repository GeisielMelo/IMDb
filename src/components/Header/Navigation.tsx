import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { SearchBar } from './SearchBar'
import { Menu, X, LogOut, Search } from 'lucide-react'
import logo from '../../assets/svg/logo.svg'
import { NavigationFlex, NavigationBox } from './NavigationMenu'

const Navigation: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)

  const handleLogOut = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Error on Logout.')
    }
  }

  const handleOpenMenu = () => {
    if (isSearchOpen) setIsSearchOpen(false)
    setIsMenuOpen(!isMenuOpen)
  }

  const handleOpenSearch = () => {
    if (isMenuOpen) setIsMenuOpen(false)
    setIsSearchOpen(!isSearchOpen)
  }

  return (
    <nav className='w-full bg-white'>
      <div className='flex justify-between items-center py-4 px-6 md:px-8 shadow-md'>
        <div className='flex items-center gap-6'>
          <img className='h-8 cursor-pointer' src={logo} onClick={() => navigate('/')} alt='Logo' />
          <NavigationFlex />
        </div>

        <div className='flex gap-6'>
          {user ? (
            <button onClick={() => handleLogOut()}><LogOut /></button>
          ) : (
            <button onClick={() => navigate('/sign-in')}>Login</button>
          )}
          <button onClick={() => handleOpenSearch()}>{isSearchOpen ? <X /> : <Search />}</button>
          <button className='block md:hidden' onClick={() => handleOpenMenu()}><Menu /></button>
        </div>
      </div>
      {isMenuOpen && <NavigationBox />}
      {isSearchOpen && <SearchBar />}
    </nav>
  )
}
export default Navigation
