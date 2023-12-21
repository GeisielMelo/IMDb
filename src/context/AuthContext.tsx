import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, User, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../config/firebase'

type AuthContextProps = {
  authenticated: boolean
  user: User | null
  loading : boolean
  signUp: (email: string, password: string) => Promise<UserCredential>
  signIn: (email: string, password: string) => Promise<UserCredential>
  logout: () => Promise<void>
}

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider.')
  }
  return context
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      setUser(userData)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value: AuthContextProps = {
    authenticated: !!user,
    user,
    loading,
    signUp,
    signIn,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
