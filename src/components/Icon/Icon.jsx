import PropTypes from 'prop-types';
import React from 'react';
import { IconContext } from 'react-icons';

const Icon = ({ icon, fontSize, color, handleWishlist }) => {
  return (
    <>
      <IconContext.Provider value={{ style: { fontSize, color } }}>
        <div
          style={{ cursor: 'pointer' }}
          role='none'
          onKeyDown={handleWishlist}
          onClick={handleWishlist}>
          {icon}
        </div>
      </IconContext.Provider>
    </>
  );
};

Icon.propTypes = {
  icon: PropTypes.node.isRequired,
  fontSize: PropTypes.string,
  color: PropTypes.string.isRequired,
  handleWishlist: PropTypes.func.isRequired,
};

Icon.defaultProps = {
  fontSize: '20px',
  color: 'black',
};

export default Icon;
