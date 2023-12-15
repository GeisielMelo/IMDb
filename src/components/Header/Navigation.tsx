import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import logo from '../../assets/svg/IMDB.svg'

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <nav className='flex justify-between items-center px-6 py-2'>
      <img className='h-8' src={logo} alt='Logo' />

      <div className={`absolute md:static bg-white left-0 top-12 md:w-auto w-full flex items-center px-6 ${!isOpen && 'hidden'} md:block`}>
        <ul className='flex md:flex-row flex-col md:items-center md:gap-[4vw] py-2 gap-8'>
          <li className='whitespace-nowrap'>Home</li>
          <li className='whitespace-nowrap '>TV Show</li>
          <li className='whitespace-nowrap '>Movies</li>
          <li className='whitespace-nowrap'>New</li>
          <li className='whitespace-nowrap md:hidden'>Login</li>
        </ul>
      </div>

      <div className='flex'>
        <button className='hidden md:block'>Login</button>
        <button className='md:hidden' onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X/> : <Menu />}
        </button>
      </div>
    </nav>
  )
}
export default Navigation
