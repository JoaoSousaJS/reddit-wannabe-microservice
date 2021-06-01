import {
  Container,
  FormControl,
  Button,
  FormLabel,
  Input,
  FormErrorMessage
} from '@chakra-ui/react'
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

  console.log(errors)

  const handleSignUp = handleSubmit(async ({ email, password }) => {
    console.log(email)
    console.log(password)
  })

  return (
    <Container padding="3">
      <form onSubmit={handleSignUp}>
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
    </Container>
  )
}
