import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const menu = [
  { option: 'Movies', url: '' },
  { option: 'TV Show', url: '' },
]

export const NavigationFlex: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  return (
    <ul className='hidden gap-6 md:flex'>
      {menu.map((_, key) => (
        <li
          className='cursor-pointer'
          key={key}
          onClick={() => navigate(_.url)}
        >
          {_.option}
        </li>
      ))}
      {user && (
        <li className='cursor-pointer' onClick={() => navigate('/my-list')}>
          My List
        </li>
      )}
    </ul>
  )
}

export const NavigationBox: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  return (
    <ul className='absolute flex flex-col gap-2 md:hidden px-8 py-2 w-full bg-white z-10'>
      {menu.map((_, key) => (
        <li
          className='cursor-pointer'
          key={key}
          onClick={() => navigate(_.url)}
        >
          {_.option}
        </li>
      ))}
      {user && (
        <li className='cursor-pointer' onClick={() => navigate('/my-list')}>
          My List
        </li>
      )}
    </ul>
  )
}
