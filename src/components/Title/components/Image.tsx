type Image = {
  title: string | undefined
  src: string
}

export const Image: React.FC<Image> = ({ title, src }) => {
  const url = 'https://image.tmdb.org/t/p/w500'
  const setAlt = title ? `A poster about: ${title}` : 'The title poster.'

  return (
    <div className='max-w-[200px] md:max-w-[300px] w-full'>
      <img className='rounded-lg shadow-lg' src={url + src} alt={setAlt} />
      <img src='' alt='' />
    </div>
  )
}
