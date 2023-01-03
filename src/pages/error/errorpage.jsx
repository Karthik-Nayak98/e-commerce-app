import React from 'react';
import { Link } from 'react-router-dom';

import './error.styles.css';

function Error() {
  return (
    <section>
      <h1 className='error__heading'>404</h1>
      <h2 className='error__side-heading'>Page not found</h2>
      <p className='error__text'>
        Sorry, the page you are looking for does not exist
      </p>
      <Link className='back_button' to='/'>
        Go back
      </Link>
    </section>
  );
}

export default Error;
