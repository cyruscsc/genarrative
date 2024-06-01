import { endpoints } from '@/lib/endpoints'
import { ServerError } from '@/lib/types'
import { useUserStore } from '@/lib/user-store'
import { toast } from 'sonner'

const Dashboard = () => {
  const { user, clearUser } = useUserStore((state) => state)

  const handleSignOut = async () => {
    try {
      const response = await fetch(endpoints.signOut, {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      if (response.ok) {
        toast.success('Success')
      } else {
        const data: ServerError = await response.json()
        toast.error(data.detail)
      }
      clearUser()
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h2> Hi {user?.display_name || user?.email}</h2>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

export default Dashboard
