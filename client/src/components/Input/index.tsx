import { Text, Input } from '@chakra-ui/react'
import { useState } from 'react'
type InputTypes = {
  inputName: string
  placeholder: string
}

const InputValue = ({ inputName, placeholder }: InputTypes) => {
  const [value, setValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.currentTarget.value)

  return (
    <>
      <Text>{inputName}</Text>
      <Input
        size="md"
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
      />
    </>
  )
}

export default InputValue
