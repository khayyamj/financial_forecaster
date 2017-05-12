import React from 'react'
import { render } from 'react-dom'
import Welcome from './Components/Welcome'
import './App.scss'

const App = React.createClass({
  render () {
    return (
      <div>
        Financial Forecaster is now live!
        <Welcome />
      </div>
    )
  }
})

render(<App />, document.getElementById('root'))
