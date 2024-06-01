import { Navigate, Route, Routes } from 'react-router-dom'
import {
  Dashboard,
  Examples,
  History,
  Home,
  Playground,
  Settings,
  SignIn,
  SignUp,
} from '@/pages'
import { AnonRoute, AuthRoute } from './components'
import { routes } from './lib/routes'

function App() {
  return (
    <Routes>
      <Route path={routes.home} element={<Home />} />
      <Route element={<AuthRoute />}>
        <Route path={routes.dashboard.root} element={<Dashboard />}>
          <Route
            index
            element={<Navigate to={routes.dashboard.playground} />}
          />
          <Route path={routes.dashboard.playground} element={<Playground />} />
          <Route path={routes.dashboard.examples} element={<Examples />} />
          <Route path={routes.dashboard.history} element={<History />} />
          <Route path={routes.dashboard.settings} element={<Settings />} />
        </Route>
      </Route>
      <Route element={<AnonRoute />}>
        <Route path={routes.signUp} element={<SignUp />} />
        <Route path={routes.signIn} element={<SignIn />} />
      </Route>
    </Routes>
  )
}

export default App
