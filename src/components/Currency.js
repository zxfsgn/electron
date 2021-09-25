import React, { useEffect, useState } from 'react'
import qq from '../qq.json'
import Details from './Details'
import './styles/Currency.scss'

const Currency = ({ currency, symbol, rate }) => {
  const [countries, setCountries] = useState([])
  const [view, setView] = useState(false)

  useEffect(() => {
    let arr = []
    for (const key in qq) {
      if (qq[key] === currency) {
        arr.push(key.toLowerCase())
      }
    }
    setCountries(arr)
  }, [currency])

  const changeView = (e) => {
    e.preventDefault()
    setView(!view)
  }

  return (
    <li className={'currency__item'}>
      <div className={'currency__name'} onClick={changeView}>{symbol}</div>
      {view && <Details currency={currency} rate={rate} countries={countries} />}
    </li>
  )
}

export default Currency

