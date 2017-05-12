import React from 'react'
import './Welcome.scss'

const Welcome = React.createClass({
  render () {
    return (
      <div className='welcome-container'>
        <h1>Financial Forecaster</h1>
        <img src='../images/budget_preview.png' />
        <div className='welcome-enter-button'>
          <a>Enter</a>
        </div>
      </div>
    )
  }
})

export default Welcome
