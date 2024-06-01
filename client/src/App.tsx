import { Route, Routes } from 'react-router-dom'
import { Dashboard, Home, SignIn, SignUp } from '@/pages'
import { AnonRoute, AuthRoute } from './components'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route element={<AuthRoute />}>
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
      <Route element={<AnonRoute />}>
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
      </Route>
    </Routes>
  )
}

export default App
