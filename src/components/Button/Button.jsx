import PropTypes from 'prop-types';
import React from 'react';
import './Button.css';

export default function Button({ classname, title, children, ...otherProps }) {
  return (
    <button className={`button ${classname}`} {...otherProps}>
      {title} {children}
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.object,
  classname: PropTypes.string.isRequired,
};
