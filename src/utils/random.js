/**
 * Generate a random number
 * @param {number} min
 * @param {number} max
 * @param {number} digits
 * @param {boolean} range covers the positive and negative range
 * @returns {number}
 */
export function randomNumber (min, max, digits, range) {
  const plusOrMinus = range && Math.random() < 0.5 ? -1 : 1

  if (!digits) {
    return Math.floor(Math.random() * ((max - min) * plusOrMinus + 1)) + min
  }

  return Number((Math.random() * ((max - min) * plusOrMinus) + min).toFixed(digits))
}

/**
 * Generates a random brazilian zip code
 * @returns {string} Eg: "88037-000"
 */
export function getRandomZipCode () {
  const number = randomNumber(10000000, 99000000)
  const splittedNumber = String(number).split('')
  return `${splittedNumber.slice(0, 5)}-${splittedNumber.slice(5, 8)}`
}

/**
 * Generenates a random address
 * @param {import('../../services/addresses').Address} baseAddress
 * @returns {import('../../services/addresses').Address}
 */
export function generateRandomAddress (baseAddress) {
  if (!baseAddress) {
    baseAddress = {
      number: 238,
      zipCode: '88015-420',
      latitude: -27.59022,
      longitude: -48.543542
    }
  }

  const { latitude, longitude } = baseAddress
  const randomAddress = {
    number: randomNumber(1, 1000),
    zipCode: getRandomZipCode(),
    latitude: randomNumber(latitude, latitude + 0.005, 4, true),
    longitude: randomNumber(longitude, longitude + 0.005, 4, true),
    residents: randomNumber(1, 10)
  }

  return randomAddress
}
