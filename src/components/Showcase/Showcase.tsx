import { useFetchCategory } from '../../hooks/useFetchCategory'
import { MovieData } from '../../types/MovieData'
import { Banner } from './Banner'

type ShowcaseProps = {
  url: string
}

const Showcase: React.FC<ShowcaseProps> = ({ url }) => {
  const { data, error, loading } = useFetchCategory<MovieData[]>(url)

  if (error) return null

  const setRandomBackground = (element: MovieData[]) => {
    const bgUrl = 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces'
    const randomIndex = Math.floor(Math.random() * element.length)
    const item = element[randomIndex]
    return `url(${bgUrl + item.backdrop_path})`
  }

  return loading ? (
    <section className='h-[18.75rem] md:h-[31.25rem] animate-pulse bg-zinc-500' />
  ) : (
    data && <Banner src={setRandomBackground(data)} />
  )
}

export default Showcase
