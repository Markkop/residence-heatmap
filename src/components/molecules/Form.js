import FormInput from '../atoms/FormInput'
import { createAddresses } from '../../services/addresses'
import { useState } from 'react'
import { zipCodeFormatter } from '../../utils/formater'

function Form ({ addAddress, addRandomAddress }) {
  const [isFormValid, setIsFormValid] = useState(false)
  const [zipCode, setZipCode] = useState('')
  const [number, setNumber] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [residents, setResidents] = useState('')

  const inputs = [
    {
      label: 'Zip Code',
      name: 'zipcode',
      type: 'text',
      placeholder: '88015-420',
      state: zipCode,
      stateSetter: setZipCode,
      validator: value => /^\d{5}-\d{3}$/.test(value),
      formatter: zipCodeFormatter
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

  return <div className="residence-panel">
    <div className="form-container">
      <form className="form" onSubmit={onFormSubmit}>
        <h2>Register a residence</h2>
        {inputs.map(input =>
          <FormInput
            setIsFormValid={setIsFormValid}
            key={input.name}
            {...input}
          />)}
        <button type="submit" className="form-submit">Send</button>
      </form>
      <button onClick={addRandomAddress}>Add a random residence</button>
    </div>
  </div>
}

export default Form
