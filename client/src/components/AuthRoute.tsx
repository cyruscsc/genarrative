import { routes } from '@/lib/routes'
import { useUserStore } from '@/lib/user-store'
import { Navigate, Outlet } from 'react-router-dom'

const AuthRoute = () => {
  const { user } = useUserStore((state) => state)
  return user ? <Outlet /> : <Navigate to={routes.signIn} replace />
}

export default AuthRoute
