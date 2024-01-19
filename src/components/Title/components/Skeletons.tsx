export const HeroSkeleton: React.FC = () => {
  return (
    <div className='h-[37rem] p-8 bg-[rgba(31.5,10.5,10.5,1)]'>
      <div className='max-h-[37rem] h-full rounded-lg animate-pulse bg-zinc-400' />
    </div>
  )
}
