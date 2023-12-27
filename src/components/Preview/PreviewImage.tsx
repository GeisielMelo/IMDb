type Image = {
  backdrop: string | undefined
  poster: string | undefined
  alt: string | undefined
}

export const Image: React.FC<Image> = ({ backdrop, poster, alt }) => {
  return (
    <>
      <img
        className='hidden md:block	md:max-h-80 md:aspect-[9/16] md:object-cover'
        src={poster || backdrop}
        alt={alt}
      />
      {backdrop && <img className='md:hidden' src={backdrop} alt={alt} />}
    </>
  )
}
