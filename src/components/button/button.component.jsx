import React from 'react'
import PropTypes from 'prop-types'
import './button.styles.css';

export default function Button({ classname, title, children, ...otherProps }) {
  return (
    <button className={`button ${classname}`} {...otherProps}>
      {title} {children}
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  classname: PropTypes.string.isRequired
}