import React from 'react'

type IFooter = {
  fixed?: boolean
}

const Footer: React.FC<IFooter> = ({fixed = false}) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`${fixed && 'fixed bottom-0 w-full'} flex items-center justify-center mt-4`}>
      <p className='p-6 text-center'>
        &copy; {currentYear}{' '}
        <a href='https://github.com/GeisielMelo' target='_blank'>
          GeisielMelo
        </a>
      </p>
    </footer>
  )
}

export default Footer
