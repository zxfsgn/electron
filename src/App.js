import React, { Component } from 'react'
import Currency from './components/Currency'
import './App.scss'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = { currencies: null, show: false, qq: null }
  }

  componentDidMount() {
    const getCurrencies = async () => {
      const qq = await window.api.invoke('getCountries', 'http://country.io/currency.json')
      const rate = await window.api.invoke('getRate', 'http://data.fixer.io/api/latest?access_key=22b1355a2f094758f387079fefae8442')
      const symbols = await window.api.invoke('getSymbols', 'http://data.fixer.io/api/symbols?access_key=22b1355a2f094758f387079fefae8442')
      let obj = {}
      for (const key in rate.rates) {
        obj[key] = { rate: rate.rates[key], symbol: symbols.symbols[key] }
      }
      this.setState({ currencies: obj, qq: qq })
    }
    getCurrencies()
  }

  componentDidUpdate() {
    const button = document.querySelector('#view')
    if (this.state.show) {
      button.textContent = 'Hide'
    } else {
      button.textContent = 'Show'
    }
  }

  changeView = (e) => {
    e.preventDefault()
    this.setState((state) => ({
      show: !state.show
    }))
  }

  render() {
    const { currencies, show, qq } = this.state

    return (
      <div className="App">
        <button id='view' onClick={this.changeView}>Show</button>
        <ul>
          {show && currencies && Object.entries(currencies).map(([currency, properties]) =>
            <Currency qq={qq} currency={currency} symbol={properties.symbol} rate={properties.rate} key={currency} />
          )}
        </ul>
        {show && !currencies && <div>Загрузка...</div>}
      </div>
    )
  }
}

export default App
