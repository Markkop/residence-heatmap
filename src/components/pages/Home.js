import Map from '../atoms/Map'
import Form from '../molecules/Form'
import { useEffect, useState } from 'react'
import { getAddresses } from '../../services/addresses'

/**
 * Get addresses from API and set them to their state
 * @param {React.Dispatch<React.SetStateAction<any[]>>} setAddresses
 */
async function getAndSetAddresses (setAddresses) {
  const addresses = await getAddresses()
  setAddresses(addresses)
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

  return <main>
    <Map addresses={addresses}/>
    <Form addAddress={addAddress}/>
  </main>
}

export default Home
