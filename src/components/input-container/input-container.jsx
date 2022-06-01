import React from 'react';
import PropTypes from 'prop-types';

import './input-container.styles.css';

const InputContainer = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export default InputContainer;

InputContainer.propTypes = {
  children: PropTypes.array.isRequired,
};
