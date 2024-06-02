import { useUserStore } from '@/lib/user-store'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Coffee } from 'lucide-react'

const Header = () => {
  const { user } = useUserStore((state) => state)
  return (
    <header className='sticky top-0 z-10 flex h-[57px] items-center gap-2 border-b bg-background px-4'>
      <h1 className='text-xl font-semibold'>Genarrative</h1>
      <Badge variant='outline'>{user?.tier ?? 'none'}</Badge>
      <Button variant='outline' size='sm' className='ml-auto gap-1.5 text-sm'>
        <Coffee className='size-3.5' />
      </Button>
    </header>
  )
}

export default Header
