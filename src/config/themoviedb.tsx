export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_THEMOVIEDB_AUTHORIZATION,
  },
}
