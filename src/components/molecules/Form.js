import { useState } from 'react'
import { createAddresses } from '../../services/addresses'
import { zipCodeFormatter } from '../../utils/formater'
import FormInput from '../atoms/FormInput'
import {
  zipCodeValidator,
  latitudeValidator,
  longitudeValidator,
  residentsValidator
} from '../../utils/validators'

function Form ({ addAddress, addRandomAddress, resetAddresses }) {
  const [validInputs, setValidInputs] = useState(new Set())
  const [zipCode, setZipCode] = useState('')
  const [number, setNumber] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [residents, setResidents] = useState('')
  const [hasSentForm, setHasSentForm] = useState(false)

  const inputs = [
    {
      label: 'Zip Code',
      name: 'zipcode',
      type: 'text',
      placeholder: '88015-420',
      state: zipCode,
      stateSetter: setZipCode,
      formatter: zipCodeFormatter,
      validator: zipCodeValidator
    },
    {
      label: 'Number',
      name: 'number',
      type: 'number',
      placeholder: 238,
      state: number,
      stateSetter: setNumber
    },
    {
      label: 'Latitude',
      name: 'latitude',
      type: 'number',
      placeholder: -27.59022,
      state: latitude,
      stateSetter: setLatitude,
      validator: latitudeValidator
    },
    {
      label: 'Longitude',
      name: 'longitude',
      type: 'number',
      placeholder: -48.543542,
      state: longitude,
      stateSetter: setLongitude,
      validator: longitudeValidator
    },
    {
      label: 'Residents',
      name: 'residents',
      type: 'number',
      placeholder: 10,
      state: residents,
      stateSetter: setResidents,
      validator: residentsValidator
    }
  ]

  const isFormValid = validInputs.size === inputs.length

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
      return
    }

    await createAddresses(address)
    addAddress(address)

    setHasSentForm(true)
    setTimeout(() => {
      setHasSentForm(false)
    }, 2000)
  }

  return <div className="residence-panel">
    <div className="form-container">
      <form className="form" onSubmit={onFormSubmit}>
        <h2>Register a residence</h2>
        {inputs.map(input =>
          <FormInput
            setValidInputs={setValidInputs}
            key={input.name}
            {...input}
          />)}
        <button
          type="submit"
          className={`form-submit ${hasSentForm ? 'sent' : ''}`}
          disabled={!isFormValid}
          >
          {hasSentForm ? '✅' : 'Register'}
        </button>
      </form>
      <button onClick={addRandomAddress}>Add a random residence</button>
      <button onClick={resetAddresses}>Reset to initial state</button>
    </div>
  </div>
}

export default Form
