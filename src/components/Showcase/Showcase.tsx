import { useFetchCategory } from '../../hooks/useFetchCategory'
import { MovieData } from '../../types/MovieData'

type ShowCaseProps = {
  url: string
}

const Showcase: React.FC<ShowCaseProps> = ({ url }) => {
  // const bgUrl = 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces'
  const { data, error, loading } = useFetchCategory<MovieData[]>(url)

  if (error) return null

  const setRandomShowCase = (element: MovieData[]) => {
    const randomIndex = Math.floor(Math.random() * element.length)
    return element[randomIndex]
  }

  return loading ? (
    <section className='h-96 bg-zinc-500 rounded animate-pulse' />
  ) : (
    data && (
      <section className='h-96 rounded pt-16 px-10 bg-no-repeat bg-cover'>
        <div>
          <h1>{'Bem-Vindo(a).'}</h1>
          <h2>{'Milhões de Filmes, Séries e Pessoas para Descobrir. Explore já.'}</h2>
        </div>
      </section>
    )
  )
}

export default Showcase
