import React, { useEffect, useState } from 'react'

const Currency = ({ currency }) => {
  const [country, setCountry] = useState('')

  useEffect(() => {
    const getFlag = async () => {
      let response = await fetch('http://country.io/currency.json')
      console.log(response)
      response = response.json()
      console.log(response)
      return response[currency]
    }
    setCountry(getFlag())
  }, [])

  return (
    <div>
      {country}&&<img
        src={`https://flagcdn.com/16x12/${country}.png`}
        width="16"
        height="12"
        alt={country}></img>
    </div>
  )
}

export default Currency

