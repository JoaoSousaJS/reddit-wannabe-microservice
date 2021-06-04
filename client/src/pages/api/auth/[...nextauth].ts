import NextAuth from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next-auth/internals/utils'
import Providers from 'next-auth/providers'

const options = {
  pages: {
    signIn: '/auth/signin'
  },
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/users/signin`,
          {
            method: 'POST',
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            }),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
          }
        )

        const response = await res.json()

        if (response.user) {
          return { ...response.user, jwt: response.jwt }
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    session: async (session: any, user: any) => {
      session.jwt = user.jwt
      session.id = user.id

      return Promise.resolve(session)
    },
    jwt: async (token: any, user: any) => {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.jwt = user.jwt
      }

      return Promise.resolve(token)
    }
  }
}

const Auth = (req: NextApiRequest, res: NextApiResponse) => {
  NextAuth(req, res, options)
}

export default Auth
