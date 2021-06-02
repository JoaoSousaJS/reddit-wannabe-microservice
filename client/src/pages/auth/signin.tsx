import { Container } from 'components/Container'

import { SignIn } from '../../components/SignIn/index'
import { Main } from 'components/Main'

const signin = () => {
  return (
    <Container height="100%">
      <Main>
        <SignIn />
      </Main>
    </Container>
  )
}

export default signin
