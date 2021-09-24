import { useEffect, useState } from 'react';
import './App.css';
import Currency from './components/Currency';

function App() {
  const [currencies, setCurrencies] = useState(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const getCurrencies = async () => {
      let rate = await fetch('http://data.fixer.io/api/latest?access_key=22b1355a2f094758f387079fefae8442')
      let symbols = await fetch('http://data.fixer.io/api/symbols?access_key=22b1355a2f094758f387079fefae8442')
      symbols = await symbols.json()
      rate = await rate.json()
      let obj = {}
      for (const key in rate.rates) {
        obj[key] = { rate: rate.rates[key], symbol: symbols.symbols[key] }
      }
      setCurrencies(obj)
    }
    getCurrencies()
  }, [])

  useEffect(() => {
    const button = document.querySelector('#view')
    if (show) {
      button.textContent = 'Hide'
    } else {
      button.textContent = 'Show'
    }
  }, [show])

  const changeView = (e) => {
    e.preventDefault()
    setShow(!show)
  }

  return (
    <div className="App">
      <button id='view' onClick={changeView}>Show</button>
      {show && currencies && Object.entries(currencies).map(([currency, properties]) =>
        <div key={currency}>
          {properties.symbol}<br />
          {properties.rate}
          <Currency currency={currency} />
        </div>
      )}
    </div>
  );
}

export default App;
