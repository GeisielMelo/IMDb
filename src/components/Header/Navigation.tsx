import { useState } from 'react'
import { Menu, X, Search } from 'lucide-react'
import logo from '../../assets/svg/IMDB.svg'

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <nav className='flex justify-between items-center px-6 py-2'>
      <img className='h-8' src={logo} alt='Logo' />

      <div className={`absolute md:static bg-white left-0 top-12 md:w-auto w-full flex justify-center items-center px-6 ${!isOpen && 'hidden'} md:block z-20`} >
        <ul className='flex md:flex-row flex-col justify-center items-center md:gap-[4vw] py-2 gap-8'>
          <li className='whitespace-nowrap md:hidden'>My List</li>
          <li className='whitespace-nowrap md:hidden'>Login</li>

          <li className='flex '>
            <input className='px-2 w-full' type='text' placeholder='Search...' />
            <button className='px-2 py-1'>
              <Search />
            </button>
          </li>

        </ul>
      </div>

      <div className='flex gap-4'>
        <button className='hidden md:block'>My List</button>
        <button className='hidden md:block'>Login</button>
        <button className='md:hidden' onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  )
}
export default Navigation
