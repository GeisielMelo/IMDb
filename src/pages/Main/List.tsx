import { MovieData } from '../../types/MovieData'
import { useMovies } from '../../context/MovieContext'
import { useNavigate } from 'react-router-dom'
import ListSlider from '../../components/Carousel/ListSlider'
import Navigation from '../../components/Header/Navigation'
import Footer from '../../components/Footer/Footer'

const List: React.FC = () => {
  const navigate = useNavigate()
  const { movies, loading } = useMovies()
  const movieList: MovieData[] = []
  const serieList: MovieData[] = []
  const otherList: MovieData[] = []

  movies.forEach((element) => {
    if (element.media_type == 'tv') serieList.push(element)
    else if (element.media_type == 'movie') movieList.push(element)
    else otherList.push(element)
  })

  return (
    <>
      <Navigation />
      <section className='min-h-screen flex item-center justify-center'>
        <div className='max-w-7xl w-full my-2'>
          {movies.length ? (
            <>
              {!!movieList.length && (
                <ListSlider category='Movies' data={movieList} loading={loading} watchList={true} />
              )}
              {!!serieList.length && (
                <ListSlider category='Series' data={serieList} loading={loading} watchList={true} />
              )}
              {!!otherList.length && (
                <ListSlider category='Search' data={otherList} loading={loading} watchList={true} />
              )}
            </>
          ) : (
            <>
              <h1 className='text-center p-8'>
                Your list is empty,{' '}
                <span className='cursor-pointer underline' onClick={() => navigate('/')}>
                  return to home.
                </span>
              </h1>
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}

export default List
