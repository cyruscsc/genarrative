import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from '@/components/ui/input'
import { SquareUser } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUserStore } from '@/lib/user-store'
import { endpoints } from '@/lib/endpoints'
import { ServerError, User } from '@/lib/types'
import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Slider } from './ui/slider'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

const formSchema = z.object({
  display_name: z
    .string()
    .min(2, { message: 'Must be at least 2 characters long' })
    .max(20, { message: 'Must be at most 20 characters long' }),
  color_mode: z.enum(['light', 'dark'], { message: 'Invalid color mode' }),
  temperature: z.number().positive({ message: 'Temperature must be positive' }),
  max_words: z.number().int({ message: 'Max words must be an integer' }),
})

type FormValues = z.infer<typeof formSchema>

const ProfileModal = () => {
  const { user, setUser, clearUser } = useUserStore((state) => state)
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      display_name: user?.display_name ?? '',
      color_mode: user?.color_mode ?? 'light',
      temperature: user?.temperature ?? 0.7,
      max_words: user?.max_words ?? 30,
    },
  })

  const submitForm = async (values: FormValues) => {
    try {
      const response = await fetch(`${endpoints.user}/${user?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(values),
      })
      if (response.ok) {
        const data: User = await response.json()
        setUser(data)
        toast.success('Success')
      } else {
        const data: ServerError = await response.json()
        toast.error(data.detail)
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const signOut = async () => {
    try {
      const response = await fetch(endpoints.signOut, {
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
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='rounded-lg'
              aria-label='Profile'
            >
              <SquareUser className='size-5' />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side='right' sideOffset={5}>
          Profile
        </TooltipContent>
      </Tooltip>
      <DialogContent className='sm:max-w-96'>
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitForm)}
            className='grid w-full items-center gap-4'
          >
            <FormField
              control={form.control}
              name='display_name'
              render={({ field }) => (
                <FormItem className='flex flex-col space-y-2'>
                  <FormLabel>Display name</FormLabel>
                  <FormControl>
                    <Input placeholder='John Doe' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='color_mode'
              render={({ field }) => (
                <FormItem className='flex flex-col space-y-2'>
                  <FormLabel>Color mode</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Color mode' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='light'>Light</SelectItem>
                      <SelectItem value='dark'>Dark</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='temperature'
              render={({ field }) => (
                <FormItem className='flex flex-col space-y-2'>
                  <FormLabel>Temperature</FormLabel>
                  <FormControl>
                    <Slider
                      defaultValue={[field.value]}
                      onValueChange={field.onChange}
                      min={0.5}
                      max={1}
                      step={0.01}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='max_words'
              render={({ field }) => (
                <FormItem className='flex flex-col space-y-2'>
                  <FormLabel>Max words</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min={1}
                      placeholder='30'
                      {...field}
                      {...form.register('max_words', { valueAsNumber: true })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className='flex sm:justify-between gap-2'>
              <Button type='button' variant='ghost' onClick={signOut}>
                Sign out
              </Button>
              <Button type='submit'>Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ProfileModal
