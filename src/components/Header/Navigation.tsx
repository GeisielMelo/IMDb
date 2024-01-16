import { Menu } from './Menu'
import { Search } from './Search'
import { Watchlist } from './Watchlist'
import { Language } from './Language'
import { Sign } from './Sign'

const Navigation: React.FC = () => {
  return (
    <nav className='flex items-center justify-center w-full text-md px-2 md:px-8 bg-[rgba(18,18,18,255)] text-white'>
      <div className='flex items-center max-w-7xl w-full my-3 gap-2'>
        <Menu />
        <Search />
        <div className='hidden md:block ml-2'>
          <Watchlist />
        </div>
        <Sign />
        <Language />
      </div>
    </nav>
  )
}
export default Navigation
