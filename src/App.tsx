import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { LoginPage } from './pages/Login'
import { DashboardPage } from './pages/Dashboard'
import { useAuth } from './context/AuthContext'
import { GlobalStyles } from './styles/GlobalStyles'

const spin = keyframes`
  to { transform: rotate(360deg); }
`

const Loader = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 4px solid rgba(33, 36, 255, 0.25);
  border-top-color: var(--primary);
  animation: ${spin} 0.8s linear infinite;
`

const LoaderWrap = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
`

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isSessionLoading } = useAuth()

  if (isSessionLoading) {
    return (
      <LoaderWrap>
        <Loader />
      </LoaderWrap>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

const GuestRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isSessionLoading } = useAuth()

  if (isSessionLoading) {
    return (
      <LoaderWrap>
        <Loader />
      </LoaderWrap>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export const App = () => (
  <>
    <GlobalStyles />
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />
      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </>
)

export default App
