import { ReactNode } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

import Index from './pages/Index'
import Login from './pages/Login'
import Register from './pages/Register'
import List from './pages/List'
import NotFound from './pages/NotFound'

type RoutesProps = {
  children: ReactNode
}

const AppRoutes: React.FC = () => {
  const { authenticated, loading } = useAuth()

  const Private:React.FC<RoutesProps> = ({ children }) => {
    return loading ? (
      <span>Loading...</span>
    ) : authenticated ? (
      children
    ) : (
      <Navigate to='/sign-in' />
    )
  }

  const Public:React.FC<RoutesProps>  = ({ children }) => {
    return loading ? (
      <span>Loading...</span>
    ) : authenticated ? (
      <Navigate to='/' />
    ) : (
      children
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Index />} />
        <Route path={'*'} element={<NotFound />} />
        <Route path={'sign-in'} element={<Public><Login /></Public>}/>
        <Route path={'sign-up'} element={<Public><Register /></Public>}/>
        <Route path={'/my-list'} element={<Private><List /></Private>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
