import { AuthCard } from '@/components'
import { endpoints } from '@/lib/endpoints'

const cardDetails = {
  type: 'sign-up' as 'sign-up',
  title: 'Sign Up',
  description: 'Create an account to get started',
  buttonText: 'Sign Up',
  endpoint: endpoints.signUp,
}

const SignUp = () => {
  return (
    <div className='flex w-full justify-center items-center h-dvh'>
      <AuthCard {...cardDetails} />
    </div>
  )
}

export default SignUp
