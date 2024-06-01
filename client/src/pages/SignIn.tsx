import { AuthCard } from '@/components'
import { endpoints } from '@/lib/endpoints'

const cardDetails = {
  type: 'sign-in' as 'sign-in',
  title: 'Sign In',
  description: 'Sign in to your account to get started',
  buttonText: 'Sign In',
  endpoint: endpoints.signIn,
}

const SignIn = () => {
  return (
    <div className='flex w-full justify-center items-center h-dvh'>
      <AuthCard {...cardDetails} />
    </div>
  )
}

export default SignIn
