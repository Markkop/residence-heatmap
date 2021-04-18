import FormInput from '../atoms/FormInput'

function Form () {
  const inputs = [
    {
      label: 'Zip Code',
      name: 'zipcode',
      type: 'text'
    },
    {
      label: 'Number',
      name: 'number',
      type: 'number'
    },
    {
      label: 'Latitude',
      name: 'latitude',
      type: 'text'
    },
    {
      label: 'Longitude',
      name: 'longitude',
      type: 'text'
    },
    {
      label: 'Residents',
      name: 'residents',
      type: 'number'
    }
  ]

  const inputElements = inputs.map(({ label, name, type }) =>
    <FormInput
      key={name}
      label={label}
      name={name}
      type={type}
    />)

  return <div className="form-container">
    <form className="form">
      <h2>Register a residence</h2>
      {inputElements}
      <input type="submit" value="Send" className="form-submit"/>
    </form>
  </div>
}

export default Form
