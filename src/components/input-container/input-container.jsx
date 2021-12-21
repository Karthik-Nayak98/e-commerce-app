import React from 'react';

import './input-container.styles.css'

const InputContainer = ({children, ...props}) => {
  return <div {...props}>{children}</div>;
};

export default InputContainer;
