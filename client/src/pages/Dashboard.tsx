import { Header, SideBar } from '@/components'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='grid h-screen w-full pl-[56px]'>
      <SideBar />
      <div className='flex flex-col'>
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
