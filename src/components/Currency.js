import React, { Component } from 'react'
import Details from './Details'
import './styles/Currency.scss'

export class Currency extends Component {
  constructor(props) {
    super(props)
    this.state = { countries: [], view: false }
  }

  componentDidMount() {
    const qq = this.props.qq
    let arr = []
    for (const key in qq) {
      if (qq[key] === this.props.currency) {
        arr.push(key.toLowerCase())
      }
    }
    this.setState({ countries: arr })
  }

  changeView = () => {
    this.setState((state) => ({
      view: !state.view
    }))
  }

  render() {
    const { currency, symbol, rate } = this.props
    const { countries, view } = this.state

    return (
      <li className={'currency__item'}>
        <div className={'currency__name'} onClick={this.changeView}>{symbol}</div>
        {view && <Details currency={currency} rate={rate} countries={countries} />}
      </li>
    )
  }
}

export default Currency
