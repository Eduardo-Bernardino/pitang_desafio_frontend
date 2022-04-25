import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Layout from './components/Layout'
import Schedule from './pages/schedule'
import Scheduling from './pages/scheduling'
import AppointmentData from './pages/schedule/AppointmentData.js'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="schedule" element={<Outlet />}>
            <Route element={<Schedule />} index />
            <Route element={<AppointmentData />} path=":scheduleId" />
          </Route>
        <Route path="scheduling" element={<Scheduling />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
