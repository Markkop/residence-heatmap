import axios from 'axios'
const ADDRESSES_ENDPOINT = 'http://localhost:3031/addresses'

/**
 * @typedef Address
 * @property {number} id
 * @property {number} number
 * @property {string} zipCode
 * @property {number} latitude
 * @property {number} longitude
 * @property {number} residents
 */

/**
 * @typedef DataBaseAddress
 * @property {number} id
 * @property {number} number
 * @property {string} zipCode
 * @property {number} latitude
 * @property {number} longitude
 * @property {number} residents
 */

/**
 * Get Addresses from endpoint
 * @returns {Promise<DataBaseAddress[]>}
 */
export async function getAddresses () {
  const { data } = await axios(ADDRESSES_ENDPOINT)
  return data
}

/**
 * Create Addresses from endpoint
 * @param {Address}
 * @returns {Promise<DataBaseAddress>}
 */
export async function createAddresses (address) {
  try {
    const { data } = await axios.post(ADDRESSES_ENDPOINT, address)
    return data
  } catch (error) {
    console.log(error)
  }
}
