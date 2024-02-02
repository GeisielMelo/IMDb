import { useFetchCategory } from '../../hooks/useFetchCategory'
import { MovieData } from '../../types/MovieData'

type ShowCaseProps = {
  url: string
}

const Showcase: React.FC<ShowCaseProps> = ({ url }) => {
  const { data, error, loading } = useFetchCategory<MovieData[]>(url)

  if (!data && loading) return <section className='h-96 xl:rounded-bl xl:rounded-br animate-pulse bg-zinc-500' />
  if (error) return null

  const setRandomShowCase = (element: MovieData[] | null) => {
    if (!element) return
    const bgUrl = 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces'
    const randomIndex = Math.floor(Math.random() * element.length)
    const item = element[randomIndex]

    const bg = `url(${bgUrl + item.backdrop_path})`
    // const url = `/${item.media_type}/${item.id}`

    return (
      <section
        className='h-96 pt-16 px-10 bg-no-repeat bg-cover bg-center xl:rounded-bl xl:rounded-br'
        style={{ backgroundImage: bg }}
      />
    )
  }

  return setRandomShowCase(data)
}

export default Showcase
