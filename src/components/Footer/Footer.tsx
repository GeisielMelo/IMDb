import React from 'react'
import { Linkedin, Github } from 'lucide-react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='flex flex-col items-center justify-center pt-8 pb-4 gap-4 bg-black text-white'>
      <div className='flex flex-wrap gap-4'>
        <button className='p-2' onClick={() => window.open('https://github.com/GeisielMelo', '_blank')}>
          <Github />
        </button>
        <button className='p-2' onClick={() => window.open('https://www.linkedin.com/in/geisiel', '_blank')}>
          <Linkedin />
        </button>
      </div>
      <ul className='flex flex-wrap gap-4 items-center justify-center'>
        <li> Privacy Policy </li>
        <li>|</li>
        <li>Terms and Policies </li>
        <li>|</li>
        <li>Accessibility</li>
      </ul>
      <p>© 2023-{currentYear} by GeisielMelo.</p>
      <p className='text-xs text-zinc-700'>{'release-1.1.3(alpha)'}</p>
    </footer>
  )
}

export default Footer
