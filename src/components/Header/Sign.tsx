import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export const Sign = () => {
  const navigate = useNavigate()
  const { authenticated, logout } = useAuth()

  return (
    <button
      className='px-4 text-md whitespace-nowrap'
      onClick={() => (authenticated ? logout() : navigate('/sign-in'))}
    >
      {authenticated ? <span>Sign Out</span> : <span>Sign In</span>}
    </button>
  )
}
