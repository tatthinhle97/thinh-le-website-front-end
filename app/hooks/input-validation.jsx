import {useEffect, useState} from 'react'

export default function useInputValidation(
  shouldValidate,
  inputElement,
  value
) {
  const [validationMessage, setValidationMessage] = useState('')

  useEffect(() => {
    if (shouldValidate && inputElement) {
      if (!inputElement.checkValidity()) {
        setValidationMessage(inputElement.validationMessage)
      } else {
        setValidationMessage('')
      }
    }
  }, [inputElement, shouldValidate, value])

  return {
    validationMessage
  }
}
