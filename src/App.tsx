import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './features/components/protectedRoutes/protectedRoutes'
import HomePage from './features/authentication/pages/authenticated/homePage'
import LoginPage from './features/authentication/pages/unauthenticated/loginPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
