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
  const [isLoading, setIsLoading] = useState(false)
  const [invalidMessage, setInvalidMessage] = useState('')

  /**
   * Format and validates the inputted value
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  async function onInputChange (event) {
    const value = event.target.value
    stateSetter(value)
    const inputValue = type === 'number' ? Number(value) : value
    let formattedValue = null

    if (formatter) {
      formattedValue = formatter(inputValue, state)
      stateSetter(formattedValue)
    }

    const newValue = formattedValue || inputValue
    setIsLoading(true)
    const validationResult = validator ? await validator(newValue) : true
    setIsLoading(false)
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
  const invalidClassName = isInputValid ? '' : 'invalid'
  const loadingClassName = isLoading ? 'field-loading' : ''
  return <div className="form-field">
    <label className={`form-label ${name}`}>
      <p>{label}:</p>
      <div>
        <input
          type={type}
          name={name}
          onChange={onInputChange}
          placeholder={placeholder}
          className={`${invalidClassName} ${loadingClassName}`}
          value={state}
          step={hasFloatStep ? 0.00001 : undefined}
          required
        />
      </div>
    </label>
    {!isInputValid && <p className="field-error" >{invalidMessage}</p>}
  </div>
}

export default FormInput
