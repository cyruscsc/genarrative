import { Route, Routes } from 'react-router-dom'
import { Home, SignIn, SignUp } from '@/pages'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />
    </Routes>
  )
}

export default App
