import Slider from '../Carousel/Slider'

type Similar = {
  locale: string
  type: string
  id: string | number
}

export const TitleSimilar: React.FC<Similar> = ({ locale, type, id }) => {
  const url = `https://api.themoviedb.org/3/${type}/${id}/similar?language=${locale}&page=1`

  return (
    <section className='flex item-center justify-center'>
      <div className='max-w-7xl w-full my-4'>
        <Slider sectionName='similar' category='Similar' url={url} />
      </div>
    </section>
  )
}
