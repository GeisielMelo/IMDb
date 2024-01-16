import { Search as SearchIcon, X } from 'lucide-react'
import { useState } from 'react'

export const Search: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className='relative w-full flex rounded justify-end md:justify-normal bg-transparent md:bg-white'>
        <input className='hidden md:block w-full rounded-l' type='text' name='search' />
        <button className='hidden md:block mx-4 my-1 text-zinc-500'>
          <SearchIcon />
        </button>
        <button className='block md:hidden' onClick={() => setIsOpen(!isOpen)}>
          <SearchIcon />
        </button>
      </div>

      {isOpen && (
        <div className='fixed top-0 left-0 py-3 px-2 z-10 w-full flex md:hidden bg-[rgba(18,18,18,255)]'>
          <div className='relative flex w-full'>
            <input className='w-full bg-white rounded-l' type='text' />
            <button className='px-2 py-1 rounded-r text-zinc-500 bg-white'>
              <SearchIcon />
            </button>
            <button className='bg-transparent px-2 ml-2 text-zinc-500' onClick={() => setIsOpen(!isOpen)}>
              <X />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
