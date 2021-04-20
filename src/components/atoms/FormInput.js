import { useState } from 'react'

function FormInput (props) {
  const {
    setValidInputs,
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
  const [invalidMessage, setInvalidMessage] = useState('')

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
    const validationResult = validator ? validator(newValue) : true
    if (validationResult === true) {
      setValidInputs(state => state.add(name))
      setIsInputValid(true)
      setInvalidMessage('')
      return
    }

    setValidInputs(state => { state.delete(name); return state })
    setIsInputValid(false)
    setInvalidMessage(validationResult)
  }

  const hasFloatStep = type === 'number' && /latitude|longitude/.test(name)
  return <div className="form-field">
    <label className={`form-label ${name}`}>
      <p>{label}:</p>
      <input
        type={type}
        name={name}
        onChange={onInputChange}
        placeholder={placeholder}
        className={isInputValid ? '' : 'invalid'}
        value={state}
        step={hasFloatStep && 0.00001}
        required
      />
    </label>
    {!isInputValid && <p className="field-error" >{invalidMessage}</p>}
  </div>
}

export default FormInput
