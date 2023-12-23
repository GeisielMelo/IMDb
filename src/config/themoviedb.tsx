type THeaders = {
  accept: string
  Authorization: string
}

type TOptions = {
  method: string
  headers: THeaders
}

type TUrl = { [key: string]: string }

export const options: TOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_THEMOVIEDB_AUTHORIZATION}`,
  },
}

export const url: TUrl = {
  trending: 'https://api.themoviedb.org/3/trending/all/day?language=en-US',
  movies: 'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
  tvShow: 'https://api.themoviedb.org/3/trending/tv/day?language=en-US',
  upcoming: 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
}
