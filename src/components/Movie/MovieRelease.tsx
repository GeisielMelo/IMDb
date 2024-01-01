import { useFetchTMDB } from '../../hooks/useFetchTMDB'
import { ReleaseSkeleton } from './Skeletons'

type ReleaseProps = {
  id?: string
}

type ReleaseDatesType = {
  certification: string
  release_date: string
}

type ReleaseTypes = {
  iso_3166_1: string
  release_dates: ReleaseDatesType[]
}

type ReleaseData = {
  results: ReleaseTypes[]
}

export const MovieRelease: React.FC<ReleaseProps> = ({ id }) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/release_dates`
  const { data, loading, error } = useFetchTMDB<ReleaseData>(url)

  if (loading) return <ReleaseSkeleton />
  if (error || !data) return

  const releaseInfo = data.results.find((_) => _.iso_3166_1 === 'BR')
  if (!releaseInfo) return

  const { release_dates } = releaseInfo

  return (
    <ul>
      <li>{release_dates.map((_) => _.certification)}</li>
      <li>{release_dates.map((_) => _.release_date)}</li>
    </ul>
  )
}
