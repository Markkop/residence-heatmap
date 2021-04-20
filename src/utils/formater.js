/**
   * Formats the ZIP Code inputed to its expected format
   * Ex: 88015-420
   * @param {string} value
   * @param {string} previousValue
   * @returns {string}
   */
export function zipCodeFormatter (value, previousValue) {
  if (!value) return value

  const currentValue = value.replace(/[^\d]/g, '')
  const currentValueLength = currentValue.length

  if (!previousValue || value.length > previousValue.length) {
    if (currentValueLength < 6) return currentValue

    return `${currentValue.slice(0, 5)}-${currentValue.slice(5, 8)}`
  }
}
