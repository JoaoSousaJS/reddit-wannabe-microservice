import { Text, Input } from '@chakra-ui/react'
type InputTypes = {
  inputName: string
  value: string
  placeholder: string
}

const InputValue = ({ inputName, value, placeholder }: InputTypes) => {
  return (
    <>
      <Text>{inputName}</Text>
      <Input value={value} placeholder={placeholder} />
    </>
  )
}

export default InputValue
