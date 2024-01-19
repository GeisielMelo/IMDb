import { useFetchTMDB } from '../../../hooks/useFetchTMDB'
import { ReleaseData } from '../../../types/ReleaseData'

type Audience = {
  type: string
  id: string | number
}

export const Audience: React.FC<Audience> = ({ type, id }) => {
  const url = `https://api.themoviedb.org/3/${type}/${id}/release_dates`
  const { data, loading, error } = useFetchTMDB<ReleaseData>(url)

  if (error || !data || loading) return null

  if (Object.prototype.hasOwnProperty.call(data, 'status_code')) return null

  const releaseInfo = data.results.find((_) => _.iso_3166_1 === 'BR')
  if (!releaseInfo) return null

  const info = releaseInfo.release_dates[0]

  if (!info) return null
  const { certification, release_date } = info

  const handleCertificationColor = () => {
    if (certification == 'L') return '#3aa847'
    if (certification == '10') return '#5aa5c3'
    if (certification == '12') return '#f9b32e'
    if (certification == '14') return '#eb7e35'
    if (certification == '16') return '#ec362f'
    if (certification == '18') return '#211c19'
    else return 'transparent'
  }

  const handleFormatDate = (date: string | null): string => {
    if (!date) return ''

    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(date)
    if (!match) return ''

    const [yyyy, mm, dd] = match.slice(1)
    return `${dd}/${mm}/${yyyy}`
  }

  return (
    <ul className='flex gap-2 items-center justify-start'>
      <li
        className='flex w-8 h-8 items-center justify-center border border-zinc-400 rounded-md text-sm text-white'
        style={{ background: handleCertificationColor() }}
      >
        {certification ? certification : 'NR'}
      </li>
      <li className='text-white'>{handleFormatDate(release_date)}</li>
    </ul>
  )
}
