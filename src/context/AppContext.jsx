import { createContext, useContext, useState, useEffect } from 'react'
import { userData } from '../data/user'

const AppContext = createContext(null)
const SESSION_MS = 30 * 60 * 1000 // 30 minutes

function isSessionValid() {
  const t = localStorage.getItem('huluLoginTime')
  return !!t && (Date.now() - Number(t)) < SESSION_MS
}

export function AppProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(isSessionValid)
  const [user] = useState(userData)

  useEffect(() => {
    if (!isLoggedIn) return
    const interval = setInterval(() => {
      if (!isSessionValid()) {
        localStorage.removeItem('huluLoginTime')
        setIsLoggedIn(false)
      }
    }, 30 * 1000) // check every 30s
    return () => clearInterval(interval)
  }, [isLoggedIn])

  function login() {
    localStorage.setItem('huluLoginTime', String(Date.now()))
    setIsLoggedIn(true)
  }

  function logout() {
    localStorage.removeItem('huluLoginTime')
    setIsLoggedIn(false)
  }

  return (
    <AppContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
