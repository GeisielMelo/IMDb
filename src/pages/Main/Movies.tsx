import { useParams } from 'react-router-dom'
import Navigation from '../../components/Header/Navigation'
import Movie from '../../components/Movie/Movie'

type IParams = {
  id?: string
}

const Movies: React.FC = () => {
  const params = useParams<IParams>()

  return (
    <>
      <Navigation />
      <section className='mt-28'>
        <Movie id={params.id} />
      </section>
    </>
  )
}

export default Movies
