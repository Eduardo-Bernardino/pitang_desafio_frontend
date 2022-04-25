import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Schedule from './pages/schedule'
import Scheduling from './pages/scheduling'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="schedule" element={<Schedule />} />
        <Route path="scheduling" element={<Scheduling />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
