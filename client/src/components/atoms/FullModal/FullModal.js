import React, { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { FullModalStyle } from './FullModalStyle'

const FullModal = ({
  children, closeModal,
}) => {
  const onKeyDown = useCallback((e) => {
    if (e.keyCode === 27) {
      e.preventDefault()
      closeModal()
    }
  }, [closeModal])

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])

  return (
    <FullModalStyle>
      {children}
    </FullModalStyle>
  )
}

FullModal.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default FullModal
