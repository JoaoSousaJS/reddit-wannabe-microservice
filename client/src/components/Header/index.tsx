import { Box, Button, Text } from '@chakra-ui/react'

const Header = () => (
  <Box
    bgColor="white"
    display="flex"
    flexDirection="row"
    justifyContent="space-between"
    padding="2"
  >
    <Text bold fontSize="lg" alignSelf="center">
      Reddit wannabe
    </Text>

    <Box>
      <Button marginRight="1" colorScheme="teal">
        Sign in
      </Button>
      <Button colorScheme="teal">Sign up</Button>
    </Box>
  </Box>
)

export default Header
