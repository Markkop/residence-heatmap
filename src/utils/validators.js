/**
 * Validates ZipCode
 * @param {string} value
 * @returns {true|string}
 */
export function zipCodeValidator (value) {
  const isValid = /^\d{5}-\d{3}$/.test(value)
  return isValid || 'ZipCode is not within format 00000-000'
}
/**
 * Validates latitude
 * @param {number} number
 * @returns {true|string}
 */
export function latitudeValidator (number) {
  const isValid = isFinite(number) && Math.abs(number) <= 90 && Math.abs(number) >= -90
  return isValid || 'Latitude is not a valid number (-90 to 90)'
}
/**
 * Validates longitude
 * @param {number} number
 * @returns {true|string}
 */
export function longitudeValidator (number) {
  const isValid = isFinite(number) && Math.abs(number) <= 180 && Math.abs(number) >= -180
  return isValid || 'Longitude is not a valid number (-180 to 180)'
}
/**
 * Validates residents number
 * @param {number} number
 * @returns {true|string}
 */
export function residentsValidator (number) {
  const isValid = number > 0 && Number.isInteger(number)
  return isValid || 'Residents is not a valid integer number'
}
