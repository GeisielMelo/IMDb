import React from 'react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='flex items-center justify-center mt-4'>
      <p className='p-6'>
        &copy; {currentYear}{' '}
        <a href='https://github.com/GeisielMelo' target='_blank'>
          GeisielMelo
        </a>
      </p>
    </footer>
  )
}

export default Footer
