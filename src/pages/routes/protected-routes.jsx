import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'

import { AuthContext } from '../../context/authContext';

const Protected = ({ children }) => {
  const user = useContext(AuthContext);
  const location = useLocation();

  return user ? (
    children
  ) : (
    <Navigate to='/signin' replace={true} state={{ path: location.pathname }} />
  );
};

export default Protected;


Protected.propTypes = {
  children: PropTypes.element.isRequired
}