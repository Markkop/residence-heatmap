import Map from '../atoms/Map'
import Form from '../molecules/Form'
import { useEffect, useState } from 'react'
import { getAddresses, resetDbAddresses } from '../../services/addresses'
import { generateRandomAddress } from '../../utils/random'

/**
 * Get addresses from API and set them to their state
 * @param {React.Dispatch<React.SetStateAction<any[]>>} setAddresses
 */
async function getAndSetAddresses (setAddresses) {
  try {
    const addresses = await getAddresses()
    setAddresses(addresses)
  } catch (error) {
    console.log(error)
  }
}

function Home () {
  const [addresses, setAddresses] = useState([])
  useEffect(() => {
    getAndSetAddresses(setAddresses)
  }, [])

  /**
   * Add an address to the addresses state
   * @param {import('../../services/addresses').Address} address
   */
  function addAddress (address) {
    setAddresses([...addresses, address])
  }

  /**
   * Add a random address near the last point (or a fixed one)
   */
  function addRandomAddress () {
    const baseAddress = addresses[addresses.length - 1]
    const randomAddress = generateRandomAddress(baseAddress)
    addAddress(randomAddress)
  }

  /**
   * Reset addresses to their initial state
   */
  async function resetAddresses () {
    await resetDbAddresses()
    await getAndSetAddresses(setAddresses)
  }

  return <main>
    <Map addresses={addresses}/>
    <Form
      addAddress={addAddress}
      addRandomAddress={addRandomAddress}
      resetAddresses={resetAddresses}
    />
  </main>
}

export default Home
