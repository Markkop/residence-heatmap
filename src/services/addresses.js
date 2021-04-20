import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'
const BASE_URL = isDev ? 'http://localhost:3001/api' : '/api'
const ADDRESSES_ENDPOINT = `${BASE_URL}/addresses`
const RESET_ENDPOINT = `${BASE_URL}/reset`

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
  try {
    const { data } = await axios(ADDRESSES_ENDPOINT)
    return data
  } catch (error) {
    console.log(error)
  }
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

/**
 * Create Addresses from endpoint
 * @returns {Promise<DataBaseAddress>}
 */
export async function resetDbAddresses () {
  try {
    const { data } = await axios.post(RESET_ENDPOINT, {
      addresses: [{
        id: 1,
        number: 238,
        zipCode: '88015-420',
        latitude: -27.59022,
        longitude: -48.543542,
        residents: 10
      }]
    })
    return data
  } catch (error) {
    console.log(error)
  }
}
