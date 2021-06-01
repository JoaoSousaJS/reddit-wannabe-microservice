import {
  Container,
  FormControl,
  Button,
  FormLabel,
  Input
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
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            placeholder="Type your email"
            type="email"
            {...register('email')}
          />

          <Input
            marginTop="2"
            id="password"
            placeholder="Type your password"
            type="password"
            {...register('password')}
          />
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
