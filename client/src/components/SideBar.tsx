import {
  Bookmark,
  History,
  LifeBuoy,
  Settings2,
  SquareTerminal,
  Triangle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { routes } from '@/lib/routes'
import { SideBarItem, ProfileModal } from '@/components'

const SideBar = () => {
  return (
    <aside className='inset-y fixed  left-0 z-20 flex h-full flex-col border-r'>
      <div className='border-b p-2'>
        <Button variant='outline' size='icon' aria-label='Home'>
          <Triangle className='size-5 fill-foreground' />
        </Button>
      </div>
      <nav className='grid gap-1 p-2'>
        <SideBarItem label='Playground'>
          <Link to={routes.dashboard.playground}>
            <SquareTerminal className='size-5' />
          </Link>
        </SideBarItem>
        <SideBarItem label='Examples'>
          <Link to={routes.dashboard.examples}>
            <Bookmark className='size-5' />
          </Link>
        </SideBarItem>
        <SideBarItem label='History'>
          <Link to={routes.dashboard.history}>
            <History className='size-5' />
          </Link>
        </SideBarItem>
        <SideBarItem label='Settings'>
          <Link to={routes.dashboard.settings}>
            <Settings2 className='size-5' />
          </Link>
        </SideBarItem>
      </nav>
      <nav className='mt-auto grid gap-1 p-2'>
        <SideBarItem label='Help'>
          <LifeBuoy className='size-5' />
        </SideBarItem>
        <ProfileModal />
      </nav>
    </aside>
  )
}

export default SideBar
