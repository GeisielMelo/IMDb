import { ReactNode } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

import Home from './pages/Main/Home'
import Login from './pages/Sign/Login'
import Register from './pages/Sign/Register'
import List from './pages/Main/List'
import NotFound from './pages/Error/NotFound'
import Search from './pages/Main/Search'
import Series from './pages/Main/Series'
import Movies from './pages/Main/Movies'

type RoutesProps = {
  children: ReactNode
}

const AppRoutes: React.FC = () => {
  const { authenticated, loading } = useAuth()

  const Private: React.FC<RoutesProps> = ({ children }) => {
    return loading ? (
      <span>Loading...</span>
    ) : authenticated ? (
      children
    ) : (
      <Navigate to='/sign-in' />
    )
  }

  const Public: React.FC<RoutesProps> = ({ children }) => {
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
        <Route path={'/'} element={<Home />} />
        <Route path={'*'} element={<NotFound />} />
        <Route path={'/search'} element={<Search />} />
        <Route path={'/tv/:id'} element={<Series />} />
        <Route path={'/movie/:id'} element={<Movies />} />
        <Route path={'sign-in'} element={<Public><Login /></Public>}/>
        <Route path={'sign-up'} element={<Public><Register /></Public>}/>
        <Route path={'/my-list'} element={<Private><List /></Private>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
