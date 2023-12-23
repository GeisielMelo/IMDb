import { FormEvent, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

type AuthError = {
  code: string
}

const Register: React.FC = () => {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState('')
  const [data, setData] = useState({ email: '', passA: '', passB: '' })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      setError('')
      setLoading(true)

      if (data.passA.length <= 5) {
        return setError('Password should be at least 6 characters.')
      }

      if (data.passA != data.passB) {
        return setError('Password do not match.')
      }

      await signUp(data.email, data.passA)
      navigate('/')
    } catch (error) {
      if ((error as AuthError).code == 'auth/email-already-in-use') {
        return setError('Email already taken.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='flex h-[100dvh] justify-center items-center'>
      <div className='max-w-[400px] w-full shadow-custom rounded-md text-center'>
        <form
          className='flex flex-col justify-center items-center gap-4 px-8  w-full '
          onSubmit={handleSubmit}
        >
          <h1 className='mt-8'>Sign Up</h1>
          {error && <p>Error: {error}</p>}
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
            value={data.passA}
            onChange={(e) => setData({ ...data, passA: e.target.value })}
          />
          <input
            className='px-2 py-1 w-full border border-slate-400 rounded-lg'
            type='password'
            name='confirm-password'
            autoComplete='on'
            placeholder='Password'
            value={data.passB}
            onChange={(e) => setData({ ...data, passB: e.target.value })}
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
          Already have an account?{' '}
          <span
            className='cursor-pointer underline'
            onClick={() => navigate('/sign-in')}
          >
            Sign In
          </span>
        </p>
      </div>
    </section>
  )
}

export default Register
