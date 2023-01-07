import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { useSelector } from 'react-redux'

const Protected = ({ children }) => {
  const { uid } = useSelector((state) => state.user)
  const location = useLocation()

  return uid ? (
    children
  ) : (
    <Navigate to='/signin' replace={true} state={{ path: location.pathname }} />
  )
}

export default Protected

Protected.propTypes = {
  children: PropTypes.element.isRequired,
}
