import React, { useEffect, useState, createContext } from 'react';
import PropTypes from 'prop-types'
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../firebase/firebase.utils';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user);
      },
      []
    );
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>
  );
};
AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired
}