import { useLocation } from 'react-router-dom'
import Navigation from '../components/Header/Navigation'

const Search = () => {
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const q = queryParams.get('q')

  return (
    <>
      <Navigation />
      <section>
        <div>
          <p>Voce buscou por: {q}.</p>
        </div>
      </section>
    </>
  )
}

export default Search
