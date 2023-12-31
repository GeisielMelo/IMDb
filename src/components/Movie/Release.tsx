import { options } from '../../config/themoviedb'
import { useFetchData } from '../../hooks/useFetchData'

type ReleaseProps = {
  id?: string
}

export const Release: React.FC<ReleaseProps> = ({ id }) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/release_dates`
  const { data, loading, error } = useFetchData(url, options)

  if (error) return

  const releaseInfo = data?.results.find((_) => _.iso_3166_1 === 'BR')

  if (!releaseInfo) return

  const { release_dates } = releaseInfo

  return loading ? (
    <p>Loading</p>
  ) : (
    <>
      <li>{release_dates.map((_) => _.certification)}</li>
      <li>{release_dates.map((_) => _.release_date)}</li>
    </>
  )
}
