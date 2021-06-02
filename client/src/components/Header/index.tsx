import { Box, Button, Text } from '@chakra-ui/react'
import Link from 'next/link'

const Header = () => (
  <Box
    bgColor="white"
    display="flex"
    flexDirection="row"
    justifyContent="space-between"
    padding="2"
  >
    <Link href="/">
      <Box>
        <Text color="black" fontSize="lg" alignSelf="center">
          Reddit wannabe
        </Text>
      </Box>
    </Link>

    <Box>
      <Link href="/auth/signin">
        <Button marginRight="1" colorScheme="teal">
          Log In
        </Button>
      </Link>
      <Button colorScheme="teal">Sign up</Button>
    </Box>
  </Box>
)

export default Header
