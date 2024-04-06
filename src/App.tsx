import AppRoutes from './AppRoutes'
import { AuthProvider } from './context/AuthContext'
import { MovieProvider } from './context/MovieContext'
import { HelmetProvider } from 'react-helmet-async'

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <MovieProvider>
          <AppRoutes />
        </MovieProvider>
      </AuthProvider>
    </HelmetProvider>
  )
}

export default App
