import PropTypes from 'prop-types';
import React from 'react';

import './InputContainer.css';

const InputContainer = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export default InputContainer;

InputContainer.propTypes = {
  children: PropTypes.array.isRequired,
};
