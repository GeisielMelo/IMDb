import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Footer from '../../components/Footer/Footer'

type AuthError = {
  code: string
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [data, setData] = useState({ email: '', password: '' })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      setError('')
      setLoading(true)
      await signIn(data.email, data.password)
      navigate('/')
    } catch (error) {
      if ((error as AuthError).code === 'auth/invalid-credential') {
        setError('Invalid E-mail or Password.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className='flex h-[100dvh] justify-center items-center p-4'>
        <div className='max-w-[400px] w-full shadow-custom rounded-md text-center'>
          <form
            className='flex flex-col justify-center items-center gap-4 px-8  w-full '
            onSubmit={handleSubmit}
          >
            <h1 className='mt-8'>Sign In</h1>
            {error && <p className='p-4'>{error}</p>}
            <input
              className='px-2 py-1 w-full border border-slate-400 rounded-lg'
              type='email'
              name='email'
              autoComplete='on'
              placeholder='E-mail'
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <input
              className='px-2 py-1 w-full border border-slate-400 rounded-lg'
              type='password'
              name='password'
              autoComplete='on'
              placeholder='Password'
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <button
              className='w-full border border-slate-400 py-2 rounded-lg'
              disabled={loading}
              type='submit'
            >
              Submit
            </button>
          </form>
          <p className='mb-8 mt-2 text-sm'>
            Not have an account yet?{' '}
            <span className='cursor-pointer underline' onClick={() => navigate('/sign-up')}>
              Sign up
            </span>
          </p>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Login
