function FormInput (props) {
  const { label, name, type } = props
  return <label className={`form-label ${name}`}>
    <p>{label}:</p>
    <input type={type} name={name} />
  </label>
}

export default FormInput
