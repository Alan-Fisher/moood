import { number } from 'prop-types'
import React from 'react'

import SpinnerStyle from './SpinnerStyle'

const Spinner = ({ size, style }) => ( // TODO: beautify
  <SpinnerStyle size={size} style={style}>
    <div id="cs-loader">
      <div className="cs-inner-body" />
    </div>
  </SpinnerStyle>
)

Spinner.propTypes = {
  size: number,
}

Spinner.defaultProps = {
  size: 40,
}

export default Spinner
