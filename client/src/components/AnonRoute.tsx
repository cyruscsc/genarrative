import { routes } from '@/lib/routes'
import { useUserStore } from '@/lib/user-store'
import { Navigate, Outlet } from 'react-router-dom'

const AnonRoute = () => {
  const { user } = useUserStore((state) => state)
  return user ? <Navigate to={routes.dashboard.root} /> : <Outlet />
}

export default AnonRoute
