import { Box, ListItem, UnorderedList } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'

type ErrorProps = {
  message: string
  field: string
}

type AxiosProps = {
  method: 'get' | 'post' | 'patch'
  url: string
  onSuccess?: () => Promise<boolean>
}

export const useRequest = ({ method, url, onSuccess }: AxiosProps) => {
  const [errors, setErrors] = useState<JSX.Element>()

  const doRequest = async (body: any) => {
    try {
      setErrors(undefined)

      if (onSuccess) {
        onSuccess()
      }

      const response = await axios[method](url, body)

      return response.data
    } catch (error) {
      setErrors(
        <Box>
          <UnorderedList>
            {error.response?.data.errors?.map((err: ErrorProps) => (
              <ListItem key={err.field}>{err.message}</ListItem>
            ))}
          </UnorderedList>
        </Box>
      )
    }
  }

  return { doRequest, errors }
}
