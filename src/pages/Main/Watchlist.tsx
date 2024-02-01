import { useMovies } from '../../context/MovieContext'
import { Card } from '../../components/Card/Card'
import Navigation from '../../components/Header/Navigation'
import Footer from '../../components/Footer/Footer'

const Watchlist: React.FC = () => {
  const { movies, loading } = useMovies()

  return (
    <>
      <Navigation />
      <section className='flex flex-col min-h-screen items-center justify-center px-2 md:px-8 pt-4 pb-8'>
        <h1 className='max-w-7xl w-full mb-4'>Watchlist</h1>
        <div className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 max-w-7xl w-full'>
          {loading ? (
            <>
              {[...Array(12)].map((_, key) => (
                <div key={key} className='max-w-xl w-full h-96 rounded animate-pulse bg-gray-500' />
              ))}
            </>
          ) : (
            <>
              {movies.map((element, key) => (
                <Card
                  key={key}
                  id={element.id}
                  src={element.src}
                  title={element.title}
                  vote={element.vote}
                  media={element.media}
                />
              ))}
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Watchlist
