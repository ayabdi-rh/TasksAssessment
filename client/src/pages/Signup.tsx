import Button from '../components/Button'
import Input from '../components/Input'
import { useSignUp } from '../hooks/useSignUp'

const SignUp = () => {
  const { handleChange, handleSubmit, isFormValid, navigate, errors, loading } = useSignUp()

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up To Manage Your Tasks
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-3" onSubmit={handleSubmit}>
          <Input
            name="email"
            type="email"
            onChange={handleChange}
            required
            label="Email Address"
            autoComplete="email"
            error={errors.email}
          />

          <Input
            name="password"
            type="password"
            onChange={handleChange}
            required
            label="Password"
            autoComplete="current-password"
            error={errors.password}
          />

          <Input
            name="firstName"
            type="firstName"
            onChange={handleChange}
            required
            label="First Name"
            autoComplete="firstName"
            error={errors.firstName}
          />
          <Input
            name="lastName"
            type="lastName"
            onChange={handleChange}
            required
            label="Last Name"
            autoComplete="lastName"
            error={errors.lastName}
          />

          <div>
            <Button type="submit" disabled={!isFormValid} loading={loading} className="mt-10">
              Sign Up
            </Button>
          </div>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a
            onClick={() => navigate('/login')}
            className="font-semibold leading-6 text-orange-600 hover:text-orange-500 hover:underline cursor-pointer"
          >
            Login Here
          </a>
        </p>
      </div>
    </div>
  )
}

export default SignUp
