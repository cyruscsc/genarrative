import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Coffee } from 'lucide-react'

const Header = () => {
  return (
    <header className='sticky top-0 z-10 flex h-[57px] items-center gap-2 border-b bg-background px-4'>
      <h1 className='text-xl font-semibold'>Playground</h1>
      <Badge variant='outline'>Tier</Badge>
      <Button variant='outline' size='sm' className='ml-auto gap-1.5 text-sm'>
        <Coffee className='size-3.5' />
      </Button>
    </header>
  )
}

export default Header
