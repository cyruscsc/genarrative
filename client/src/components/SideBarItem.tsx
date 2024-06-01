import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

interface SideBarItemProps {
  label: string
  children: ReactNode
}

const SideBarItem = ({ label, children }: SideBarItemProps) => {
  const location = useLocation()
  const active = location.pathname.split('/').at(-1) === label.toLowerCase()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className={`rounded-lg ${active && 'bg-muted'}`}
          aria-label={label}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent side='right' sideOffset={5}>
        {label}
      </TooltipContent>
    </Tooltip>
  )
}

export default SideBarItem
