import { AuthCard } from '@/components'
import { endpoints } from '@/lib/endpoints'
import { routes } from '@/lib/routes'

const cardDetails = {
  type: 'sign-in' as 'sign-in',
  title: 'Sign In',
  description: 'Sign in to your account to get started',
  buttonText: 'Sign In',
  endpoint: endpoints.signIn,
  redirect: routes.dashboard,
}

const SignIn = () => {
  return (
    <div className='flex w-full justify-center items-center h-dvh'>
      <AuthCard {...cardDetails} />
    </div>
  )
}

export default SignIn
