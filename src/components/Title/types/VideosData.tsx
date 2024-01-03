type Videos = {
  type: string
  key: string
  official: boolean
}

export type VideosData = {
  id: number
  results: Videos[]
}
