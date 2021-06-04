import {
  FormControl,
  Button,
  FormLabel,
  Input,
  FormErrorMessage
} from '@chakra-ui/react'
import { useRequest } from 'hooks/use-request'
import { signin } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
  password: string
}

export const SignIn = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<FormData>()

  const router = useRouter()

  const { doRequest, errors: apiErrors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    onSuccess: () => router.push('/')
  })

  const handleSignIn = handleSubmit(async ({ email, password }) => {
    const result = await signin('credentials', {
      email,
      password,
      redirect: false
    })

    if (result?.url) {
      return router.push(result?.url)
    }

    console.log('invalid credential')
  })

  return (
    <form onSubmit={handleSignIn}>
      <FormControl isInvalid={!!errors.email}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          placeholder="Type your email"
          type="email"
          {...register('email', {
            required: 'Required'
          })}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          placeholder="Type your password"
          type="password"
          {...register('password', {
            required: 'Required'
          })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>

      {apiErrors && apiErrors}

      <Button
        marginTop="3"
        isFullWidth
        colorScheme="teal"
        type="submit"
        isLoading={isSubmitting}
      >
        Log In
      </Button>
      <Link href="/">
        <Button marginTop="2" isFullWidth colorScheme="teal">
          Back
        </Button>
      </Link>
    </form>
  )
}
