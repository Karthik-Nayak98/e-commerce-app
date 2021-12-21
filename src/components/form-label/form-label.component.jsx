import React from 'react';

const FormLabel = ({ title, otherProps }) => {
  return <label {...otherProps}>{title}</label>;
};

export default FormLabel;
