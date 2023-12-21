import { useState } from 'react'
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

  const handleSubmit = async (email: string, passA: string, passB: string) => {
    try {
      setError('')
      setLoading(true)

      if (passA.length <= 5) {
        return setError('Password should be at least 6 characters.')
      }

      if (passA != passB) {
        return setError('Password do not match.')
      }

      await signUp(email, passA)
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
          value={data.passA}
          onChange={(e) => setData({ ...data, passA: e.target.value })}
        />
        <input
          type='password'
          placeholder='Password'
          value={data.passB}
          onChange={(e) => setData({ ...data, passB: e.target.value })}
        />
      </div>
      <button
        disabled={loading}
        onClick={() => handleSubmit(data.email, data.passA, data.passB)}
      >
        Submit
      </button>
    </section>
  )
}

export default Register
