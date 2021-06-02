import { Container } from 'components/Container'
import { Main } from 'components/Main'
import { SignUp } from 'components/SignUp'

const signup = () => {
  return (
    <Container height="100%">
      <Main>
        <SignUp />
      </Main>
    </Container>
  )
}

export default signup
