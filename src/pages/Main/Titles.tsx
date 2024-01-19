import { useParams } from 'react-router-dom'
import { useLanguages } from '../../hooks/useLanguages'
import { TitleHero } from '../../components/Title/TitleHero'
import { TitleSimilar } from '../../components/Title/TitleSimilar'
import { TitleCredits } from '../../components/Title/TitleCredits'
import { TitleReviews } from '../../components/Title/TitleReviews'
import Navigation from '../../components/Header/Navigation'
import Footer from '../../components/Footer/Footer'

type IParams = {
  id?: string
  type?: string
}

const Titles: React.FC = () => {
  const params = useParams<IParams>()
  const { locale } = useLanguages()
  const { type, id } = params

  if (!type || !id) return <p>Missing Params.</p>

  return (
    <>
      <Navigation />
      <main className='min-h-screen'>
        <TitleHero locale={locale} type={type} id={id} />
        <TitleSimilar locale={locale} type={type} id={id} />
        <TitleCredits locale={locale} type={type} id={id} />
        <TitleReviews locale={locale} type={type} id={id} />
      </main>
      <Footer />
    </>
  )
}

export default Titles
