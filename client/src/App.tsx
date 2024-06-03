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
import { useUserStore } from './lib/user-store'
import { useEffect } from 'react'
import { endpoints } from './lib/endpoints'
import { ServerError, User } from './lib/types'
import { toast } from 'sonner'

function App() {
  const { user, setUser, clearUser } = useUserStore((state) => state)

  const fetchUser = async (id: string) => {
    try {
      const response = await fetch(`${endpoints.user}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      if (response.ok) {
        const data: User = await response.json()
        setUser(data)
      } else {
        const data: ServerError = await response.json()
        toast.error(data.detail)
        clearUser()
      }
    } catch (error) {
      toast.error('Something went wrong')
      clearUser()
    }
  }

  useEffect(() => {
    user?.id && fetchUser(user.id)
  }, [])

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
