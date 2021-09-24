import React, { useEffect, useState } from 'react'
import qq from '../qq.json'

const Currency = ({ currency }) => {
  const [countries, setCountries] = useState([])
  useEffect(() => {
    let arr = []
    for (const key in qq) {
      if (qq[key] === currency) {
        arr.push(key.toLowerCase())
      }
    }
    setCountries(arr)
  }, [currency])

  return (
    <div>
      {countries.map((country) =>
        <img
          src={`https://flagcdn.com/40x30/${country}.png`}
          width="40"
          height="30"
          alt={country}
          key={country}>
        </img>
      )}
    </div>
  )
}

export default Currency

