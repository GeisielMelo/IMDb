import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Index from './pages/Index'

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Index />} />
        <Route path={'/403'} element={<section>Forbidden</section>} />
        <Route path={'*'} element={<section>NotFound</section>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
