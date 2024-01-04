type ReleaseDatesType = {
  certification: string
  release_date: string
}

type ReleaseTypes = {
  iso_3166_1: string
  release_dates: ReleaseDatesType[]
}

export type ReleaseData = {
  success: boolean
  results: ReleaseTypes[]
}

