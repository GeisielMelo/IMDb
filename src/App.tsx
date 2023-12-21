import AppRoutes from './AppRoutes'
import { AuthProvider } from './context/AuthContext'
import { MovieProvider } from './context/MovieContext'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MovieProvider>
        <AppRoutes />
      </MovieProvider>
    </AuthProvider>
  )
}

export default App
