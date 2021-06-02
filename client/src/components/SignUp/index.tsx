import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button
} from '@chakra-ui/react'
import { useRequest } from 'hooks/use-request'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

type FormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export const SignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<FormData>()

  const router = useRouter()

  const { doRequest, errors: apiErrors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    onSuccess: () => router.push('/')
  })

  const handleSignUp = handleSubmit(
    async ({ firstName, lastName, email, password, confirmPassword }) => {
      await doRequest({
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      })
    }
  )
  return (
    <form onSubmit={handleSignUp}>
      <FormControl isInvalid={!!errors.firstName}>
        <FormLabel>First Name</FormLabel>
        <Input
          id="firstName"
          placeholder="First Name"
          {...register('firstName', {
            required: 'First name is required'
          })}
        />
        <FormErrorMessage>
          {errors.firstName && errors.firstName.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.lastName}>
        <FormLabel>Last Name</FormLabel>
        <Input
          id="lastName"
          placeholder="Last Name"
          {...register('lastName', {
            required: 'Last name is required'
          })}
        />
        <FormErrorMessage>
          {errors.lastName && errors.lastName.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.email}>
        <FormLabel>Email</FormLabel>
        <Input
          id="email"
          placeholder="Email"
          {...register('email', {
            required: 'A valid email is required'
          })}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormLabel>Password</FormLabel>
        <Input
          id="password"
          placeholder="Password"
          type="password"
          {...register('password', {
            required: 'Password is required',
            min: 6
          })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.confirmPassword}>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          id="confirmPassword"
          placeholder="Type your Password again"
          type="password"
          {...register('confirmPassword', {
            required: true,
            min: 6
          })}
        />
        <FormErrorMessage>
          {errors.confirmPassword && errors.confirmPassword.message}
        </FormErrorMessage>
      </FormControl>

      {apiErrors && apiErrors}

      <Button
        isFullWidth
        colorScheme="teal"
        type="submit"
        mt="3"
        isLoading={isSubmitting}
      >
        Sign Up
      </Button>
      <Link href="/">
        <Button mt="2" isFullWidth colorScheme="teal">
          Back
        </Button>
      </Link>
    </form>
  )
}
