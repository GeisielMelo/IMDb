import { Menu as MenuIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const Menu: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-row-reverse items-center md:flex-row'>
      <h1 className='px-2 rounded cursor-pointer' onClick={() => navigate('/')}>
        TMDb
      </h1>
      <button className='flex px-4 py-1 gap-1'>
        <MenuIcon />
        <span className='hidden md:block'>Menu</span>
      </button>
    </div>
  )
}
