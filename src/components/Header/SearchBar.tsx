import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

export const SearchBar: React.FC = () => {
  const navigate = useNavigate()
  const [params, setParams] = useState<string>('')

  const handleSubmit = () => {
    params ? navigate(`/search?q=${params}`) : navigate('/')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className='absolute w-full px-8 py-4 mt-2 bg-white'>
    <div className='flex w-full border border-blue-950'>
      <input
        className='px-2 w-full outline-none focus:outline-none'
        value={params}
        onChange={(e) => setParams(e.target.value)}
        type='text'
        placeholder='Search...'
        onKeyDown={handleKeyDown}
      />
      <button className='px-2 py-1' onClick={() => handleSubmit()}>
        <Search />
      </button>
    </div>
    </div>
  )
}
