type TUrl = { [key: string]: string }

export const url: TUrl = {
  trending: 'https://api.themoviedb.org/3/trending/all/day?language=en-US',
  movies: 'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
  tvShow: 'https://api.themoviedb.org/3/trending/tv/day?language=en-US',
  upcoming: 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
}
