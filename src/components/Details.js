import React from 'react'
import './styles/Details.scss'

const Details = ({ countries, rate, currency }) => {
  return (
    <div>
      <div>Countries: {countries.map((country) =>
        <img
          src={`https://flagcdn.com/40x30/${country}.png`}
          width="40"
          height="30"
          alt={country}
          key={country}>
        </img>
      )}</div>
      <div>Rate to EUR: {rate}</div>
      <div>Abbreviation: {currency}</div>
    </div>
  )
}

export default Details
