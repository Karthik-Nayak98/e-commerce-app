import PropTypes from 'prop-types';
import React from 'react';

import './Header.css';

function Header({ header }) {
  return <h1 className='heading'>{header}</h1>;
}

export default Header;

Header.propTypes = {
  header: PropTypes.string.isRequired,
};
