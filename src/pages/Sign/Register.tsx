import { FormEvent, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useDisplayAlert } from '../../hooks/useDisplayAlert'
import Footer from '../../components/Footer/Footer'

type AuthError = {
  code: string
}

const Register: React.FC = () => {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const { Alert, displayAlert } = useDisplayAlert()
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState({ email: '', passA: '', passB: '' })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      setLoading(true)

      if (!data.email) {
        return displayAlert('Please enter a valid email address.', 'info')
      }

      if (data.passA.length <= 5) {
        return displayAlert('Password should be at least 6 characters.', 'info')
      }

      if (data.passA != data.passB) {
        return displayAlert('Password do not match.', 'warning')
      }

      await signUp(data.email, data.passA)
      navigate('/')
    } catch (error) {
      if ((error as AuthError).code == 'auth/email-already-in-use') {
        return displayAlert('Email already taken.', 'error')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className='flex h-[100dvh] justify-center items-center'>
        <div className='max-w-[400px] w-full shadow-custom rounded-md text-center'>
          <form className='flex flex-col justify-center items-center gap-4 px-8  w-full ' onSubmit={handleSubmit}>
            <h1 className='mt-8'>Sign Up</h1>
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

            <button className='w-full border border-slate-400 py-2 rounded-lg' disabled={loading} type='submit'>
              Submit
            </button>
          </form>
          <p className='mb-8 mt-2 text-sm'>
            Already have an account?{' '}
            <span className='cursor-pointer underline' onClick={() => navigate('/sign-in')}>
              Sign In
            </span>
          </p>
        </div>
      </section>
      <Alert />
      <Footer />
    </>
  )
}

export default Register
