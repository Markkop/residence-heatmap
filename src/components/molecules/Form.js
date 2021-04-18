import FormInput from '../atoms/FormInput'
import { createAddresses } from '../../services/addresses'
import { useState } from 'react'

function Form ({ addAddress }) {
  const [isFormValid, setIsFormValid] = useState(false)
  const [zipCode, setZipCode] = useState('')
  const [number, setNumber] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [residents, setResidents] = useState('')

  /**
   * Formats the ZIP Code inputed to its expected format
   * Ex: 88015-420
   * @param {string} value
   * @param {string} previousValue
   * @returns {string}
   */
  function ZipCodeFormatter (value, previousValue) {
    if (!value) return value

    const currentValue = value.replace(/[^\d]/g, '')
    const currentValueLength = currentValue.length

    if (!previousValue || value.length > previousValue.length) {
      if (currentValueLength < 6) return currentValue

      return `${currentValue.slice(0, 5)}-${currentValue.slice(5, 8)}`
    }
  }

  const inputs = [
    {
      label: 'Zip Code',
      name: 'zipcode',
      type: 'text',
      placeholder: '88015-420',
      state: zipCode,
      stateSetter: setZipCode,
      validator: value => /^\d{5}-\d{3}$/.test(value),
      formatter: ZipCodeFormatter
    },
    {
      label: 'Number',
      name: 'number',
      type: 'number',
      placeholder: 238,
      state: number,
      stateSetter: setNumber,
      validator: () => true
    },
    {
      label: 'Latitude',
      name: 'latitude',
      type: 'number',
      placeholder: -27.59022,
      state: latitude,
      stateSetter: setLatitude,
      validator: number => isFinite(number) && Math.abs(number) <= 90
    },
    {
      label: 'Longitude',
      name: 'longitude',
      type: 'number',
      placeholder: -48.543542,
      state: longitude,
      stateSetter: setLongitude,
      validator: number => isFinite(number) && Math.abs(number) <= 180
    },
    {
      label: 'Residents',
      name: 'residents',
      type: 'number',
      placeholder: 10,
      state: residents,
      stateSetter: setResidents,
      validator: number => number > 0 && Number.isInteger(number)
    }
  ]

  /**
   * Handles the form submission to create a new address
   * @param {React.FormEvent<EventTarget>} event
   */
  async function onFormSubmit (event) {
    event.preventDefault()
    const address = {
      zipCode,
      number: Number(number),
      latitude: Number(latitude),
      longitude: Number(longitude),
      residents: Number(residents)
    }

    if (!isFormValid) {
      alert('Invalido')
      return
    }

    await createAddresses(address)
    addAddress(address)
  }

  return <div className="form-container">
    <form className="form" onSubmit={onFormSubmit}>
      <h2>Register a residence</h2>
      {inputs.map(input =>
        <FormInput
          setIsFormValid={setIsFormValid}
          key={input.name}
          {...input}
        />)}
      <input type="submit" value="Send" className="form-submit"/>
    </form>
  </div>
}

export default Form
