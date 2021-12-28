import React from 'react';
import PropTypes from 'prop-types'

const FormLabel = ({ title, ...otherProps }) => {
  return <label {...otherProps}>{title}</label>;
};

export default FormLabel;

FormLabel.propTypes = {
  title: PropTypes.string.isRequired,
}
