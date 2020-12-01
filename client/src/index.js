import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './App'
import Theme from './common/Theme'

ReactDOM.render(
  <Theme>
    <App />
  </Theme>,
  document.getElementById('root'),
)
