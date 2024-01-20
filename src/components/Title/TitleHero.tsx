import { useFetchTMDB } from '../../hooks/useFetchTMDB'
import { TitleData } from '../../types/TitleData'
import { handleGetTitleName } from '../../utils/handleFunctionsUtils'
import { Image } from './components/Image'
import { Info } from './components/Info'
import { HeroSkeleton } from './components/Skeletons'

type Hero = {
  locale: string
  type: string
  id: string | number
}

export const TitleHero: React.FC<Hero> = ({ locale, type, id }) => {
  const bgUrl = 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces'
  const url = `https://api.themoviedb.org/3/${type}/${id}?language=${locale}`

  const { data, error, loading } = useFetchTMDB<TitleData>(url)

  if (error || !data) return null

  const bgImageProps = `linear-gradient(to bottom right, rgba(31.5, 10.5, 10.5, 1), rgba(31.5, 10.5, 10.5, 0.84)), url(${
    bgUrl + data.backdrop_path
  })`

  return (
    <>
      <section id='DesktopVersion' className='hidden md:block'>
        {loading ? (
          <HeroSkeleton />
        ) : (
          <div className='flex justify-center bg-no-repeat bg-cover p-8' style={{ backgroundImage: bgImageProps }}>
            <div className='max-w-7xl max-h-[510px] w-full flex'>
              <Image title={handleGetTitleName(data)} src={data.poster_path} />
              <Info data={data} locale={locale} type={type} id={id} />
            </div>
          </div>
        )}
      </section>

      <section id='MobileVersion' className='block md:hidden'>
        {loading ? (
          <HeroSkeleton />
        ) : (
          <>
            <div className='bg-no-repeat bg-cover p-8' style={{ backgroundImage: bgImageProps }}>
              <div className='max-w-7xl max-h-[510px] w-full flex'>
                <Image title={handleGetTitleName(data)} src={data.poster_path} />
              </div>
            </div>
            <Info data={data} locale={locale} type={type} id={id} />
          </>
        )}
      </section>
    </>
  )
}
