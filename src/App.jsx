import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useApp } from './context/AppContext'

function ThemeColor() {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]')
    if (!meta) return
    // Hulu account has white nav; everything else is dark
    const color = pathname === '/hulu/account' ? '#ffffff' : '#17171b'
    meta.setAttribute('content', color)
  }, [pathname])
  return null
}
import AccountL1 from './pages/disney/AccountL1'
import SubDetails from './pages/hulu/SubDetails'
import Payment from './pages/disney/Payment'
import Billing from './pages/disney/Billing'
import Invoice from './pages/disney/Invoice'
import Nielsen from './pages/disney/Nielsen'
import CancelLanding from './pages/disney/CancelLanding'
import CancelSurvey from './pages/disney/CancelSurvey'
import PauseSchedule from './pages/disney/PauseSchedule'
import PauseSuccess from './pages/disney/PauseSuccess'
import HuluLogin from './pages/hulu/Login'
import HuluPassword from './pages/hulu/Password'
import HuluAccount from './pages/hulu/Account'

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useApp()
  if (!isLoggedIn) return <Navigate to="/hulu/login" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeColor />
      <Routes>
        {/* Public Disney+ routes — no auth required */}
        <Route path="/" element={<AccountL1 />} />
        <Route path="/subscription" element={<SubDetails />} />
        <Route path="/cancel" element={<CancelLanding />} />
        <Route path="/cancel/survey" element={<CancelSurvey />} />
        <Route path="/pause" element={<PauseSchedule />} />
        <Route path="/pause/success" element={<PauseSuccess />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/nielsen" element={<Nielsen />} />

        {/* Hulu login flow */}
        <Route path="/hulu/login" element={<HuluLogin />} />
        <Route path="/hulu/password" element={<HuluPassword />} />

        {/* Hulu account — requires session */}
        <Route path="/hulu/account" element={<ProtectedRoute><HuluAccount /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
