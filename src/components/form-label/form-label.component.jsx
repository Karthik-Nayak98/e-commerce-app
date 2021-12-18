import React from 'react';

import './form-label.styles.css';

const FormLabel = ({ title, otherProps }) => {
  return <label {...otherProps}>{title}</label>;
};

export default FormLabel;
