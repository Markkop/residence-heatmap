import { useState } from 'react'

function FormInput (props) {
  const {
    setIsFormValid,
    label,
    name,
    type,
    state,
    stateSetter,
    placeholder,
    validator,
    formatter
  } = props
  const [isInputValid, setIsInputValid] = useState(true)

  /**
   * Format and validates the inputted value
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  function onInputChange (event) {
    const value = event.target.value
    stateSetter(value)
    const inputValue = type === 'number' ? Number(value) : value
    let formattedValue = null

    if (formatter) {
      formattedValue = formatter(inputValue, state)
      stateSetter(formattedValue)
    }

    const newValue = formattedValue || inputValue
    const hasPassedValidation = validator(newValue)
    if (hasPassedValidation) {
      setIsFormValid(true)
      setIsInputValid(true)
      return
    }

    setIsFormValid(false)
    setIsInputValid(false)
  }

  return <label className={`form-label ${name}`}>
    <p>{label}:</p>
    <input
      type={type}
      name={name}
      onChange={onInputChange}
      placeholder={placeholder}
      className={isInputValid ? '' : 'invalid'}
      value={state}
      required
    />
  </label>
}

export default FormInput
