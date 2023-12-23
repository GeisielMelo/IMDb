import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Menu, X, Search, LogOut, Star } from 'lucide-react'
import logo from '../../assets/svg/IMDB.svg'

const Navigation: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleLogOut = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Error on Logout.')
    }
  }

  return (
    <nav className='flex justify-between items-center p-4 shadow-md'>
      <img className='h-8' src={logo} alt='Logo' />

      <div className={`absolute md:static bg-white left-0 top-12 md:w-auto w-full flex justify-center items-center ${!isOpen && 'hidden'} md:block z-20`} >
        <ul className='flex flex-col justify-center items-center gap-8 py-4 shadow-lg md:py-0 md:flex-row md:gap-[4vw] md:shadow-none'>
          {user && <li className='whitespace-nowrap md:hidden' onClick={() => navigate('/my-list')}>My List</li>}
          {user ? (
            <li className='whitespace-nowrap md:hidden' onClick={() => handleLogOut()}>Logout</li>
          ) : (
            <li className='whitespace-nowrap md:hidden' onClick={() => navigate('/sign-in')}>Login</li>
          )}

          <li className='flex mb-4 md:mb-0'>
            <input className='px-2 w-full' type='text' placeholder='Search...'/>
            <button className='px-2 py-1'><Search /></button>
          </li>
        </ul>
      </div>

      <div className='flex gap-8'>
        {user && <button className='hidden md:block' onClick={() => navigate('/my-list')}><Star /></button>}
        {user ? (
          <button className='hidden md:block' onClick={() => handleLogOut()}><LogOut /></button>
        ) : (
          <button className='hidden md:block' onClick={() => navigate('/sign-in')}>Login</button>
        )}
        <button className='md:hidden' onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  )
}
export default Navigation
