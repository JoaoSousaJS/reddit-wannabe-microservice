import axios from 'axios'
import { IncomingMessage } from 'http'
import { NextApiRequestCookies } from 'next/dist/next-server/server/api-utils'

type AxiosRequestProps = {
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  }
}

export const client = ({ req }: AxiosRequestProps) => {
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers
    })
  } else {
    return axios.create({
      baseURL: '/'
    })
  }
}
