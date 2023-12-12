import React from 'react'
import PropTypes from 'prop-types'

const ModalBar = ({ step, total }) => <div className="modal-bar" style={{width: Math.round(step*100/total) + '%'}} />

ModalBar.propTypes = {
  step: PropTypes.number,
  total: PropTypes.number
}

export default ModalBar
