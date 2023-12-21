import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

type AuthError = {
  code: string
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [data, setData] = useState({ email: '', password: '' })

  const handleSubmit = async (email: string, password: string) => {
    try {
      setError('')
      setLoading(true)
      await signIn(email, password)
      navigate('/')
    } catch (error) {
      if ((error as AuthError).code === 'auth/invalid-credential') {
        setError('Invalid E-mail or Password.');
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='flex h-[100dvh] justify-center items-center'>
      <div className='flex flex-col gap-4'>
        {error && <p>Error: {error}</p>}
        <input
          type='email'
          placeholder='E-mail'
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type='password'
          placeholder='Password'
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button
          disabled={loading}
          onClick={() => handleSubmit(data.email, data.password)}
        >
          Submit
        </button>
      </div>
    </section>
  )
}

export default Login
