import { handleGetTitleName, handleGetTitleReleaseYear, handleTitleDuration, handleVoteAverageToPercent } from '../../../utils/handleFunctionsUtils'
import { Audience } from './Audience'
import { TitleData } from '../../../types/TitleData'
import { Trailer } from './Trailer'
import { Watch } from './Watch'
import CircularProgressBar from '../../animated/CircularProgressBar'

type Info = {
  data: TitleData
  locale: string
  type: string
  id: string | number
}

export const Info: React.FC<Info> = ({ data, locale, type, id }) => {
  return (
    <div className='flex flex-col justify-start p-8 bg-slate-700 md:pt-0 md:bg-transparent'>
      <h1 className='text-[calc(.7em+3vw)] md:text-4xl font-bold text-white'>
        {handleGetTitleName(data)} {handleGetTitleReleaseYear(data)}
      </h1>
      <ul className='flex flex-wrap gap-2 text-white'>
        {data.genres.map((_, key) => (
          <li key={key}>{_.name}</li>
        ))}
        <li>{handleTitleDuration(data.runtime)}</li>
      </ul>

      <div className='flex gap-2 mt-4 items-center'>
        <CircularProgressBar progressPercentage={handleVoteAverageToPercent(data.vote_average)} />
        <Trailer title={data.title} locale={locale} type={type} id={id} />
        <Watch element={data} type={type} />
      </div>

      <p className='my-4 font-normal text-[1.1rem] italic opacity-70 text-white'>{data.tagline}</p>
      {data.overview && <span className='font-semibold text-lg text-white'>Overview</span>}
      <p className='mt-2 mb-4 text-white'>{data.overview}</p>
      <Audience type={type} id={id} />
    </div>
  )
}
