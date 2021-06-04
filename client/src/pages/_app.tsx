import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import Header from 'components/Header'
import theme from '../../styles/theme'
import { Provider as AuthProvider } from 'next-auth/client'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider session={pageProps.session}>
      <ChakraProvider resetCSS theme={theme}>
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  )
}

export default MyApp
