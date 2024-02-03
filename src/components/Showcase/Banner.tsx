type BannerProps = {
  src: string
}

export const Banner: React.FC<BannerProps> = ({ src }) => {
  return (
    <section
      className='h-[18.75rem] md:h-[31.25rem] bg-no-repeat bg-cover bg-center'
      style={{ backgroundImage: src }}
    />
  )
}
