import { useNavigate } from 'react-router-dom'
const NotFound: React.FC = () => {
  const navigate = useNavigate()
  return (
    <section className='flex min-h-[100dvh] justify-center items-center'>
      <div>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          This page doesn't exists,{' '}
          <span onClick={() => navigate('/')}> return to home.</span>
        </p>
      </div>
    </section>
  )
}

export default NotFound
