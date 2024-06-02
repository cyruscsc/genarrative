import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useUserStore } from '@/lib/user-store'
import { ServerError, User } from '@/lib/types'
import { routes } from '@/lib/routes'

interface AuthCardProps {
  type: 'sign-up' | 'sign-in'
  title: string
  description: string
  buttonText: string
  endpoint: string
}

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Must be at least 8 characters long' })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/, {
      message: 'Must contain at least one letter and one number',
    }),
})

type FormValues = z.infer<typeof formSchema>

const AuthCard = (props: AuthCardProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const { setUser } = useUserStore((state) => state)

  const submitForm = async (values: FormValues) => {
    try {
      const response = await fetch(props.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(values),
      })
      if (response.ok) {
        const data: User = await response.json()
        setUser(data as User)
        toast.success('Success')
      } else {
        const data: ServerError = await response.json()
        toast.error(data.detail)
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <Card className='w-96'>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <CardContent className='grid w-full items-center gap-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='flex flex-col space-y-2'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='john@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='flex flex-col space-y-2'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='secret1234'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className='flex justify-between'>
            {props.type === 'sign-up' && (
              <small className='text-sm text-muted-foreground leading-none'>
                Have an account?{' '}
                <a href={routes.signIn} className='underline'>
                  Sign in
                </a>
              </small>
            )}
            {props.type === 'sign-in' && (
              <small className='text-sm text-muted-foreground leading-none'>
                New to Genarrative?{' '}
                <a href={routes.signUp} className='underline'>
                  Sign up
                </a>
              </small>
            )}
            <Button type='submit'>{props.buttonText}</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default AuthCard
