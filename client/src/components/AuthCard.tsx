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
      const data = await response.json()
      if (response.ok) {
        toast.success('Success')
      } else {
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
          <CardFooter className='justify-end'>
            <Button type='submit'>{props.buttonText}</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default AuthCard
