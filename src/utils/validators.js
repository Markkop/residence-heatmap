import axios from 'axios'

/**
 * Validates brazilian zip code using an external API
 * @param {string} zipCode
 * @returns Promise<true|string>
 */
export async function validateZipCodeExternally (zipCode) {
  try {
    const code = zipCode.replace('-', '')
    const { data } = await axios(`https://viacep.com.br/ws/${code}/json/`, {
      headers: {
        Accept: 'application/json'
      }
    })
    if (data.erro) {
      return 'This ZIP Code was not found'
    }

    return true
  } catch (error) {
    console.log(error)
    return 'Network Error'
  }
}

/**
 * Validates ZipCode
 * @param {string} value
 * @returns {Promise<true|string>}
 */
export async function zipCodeValidator (value) {
  const isValidFormat = /^\d{5}-\d{3}$/.test(value)
  if (!isValidFormat) {
    return 'ZipCode is not within format 00000-000'
  }

  return validateZipCodeExternally(value)
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
  return isValid || 'Residents is not a valid positive integer number'
}
