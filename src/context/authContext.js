import React, { useEffect, useState, createContext } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../firebase/firebase.utils';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        // console.log('user in authStateChanged', user);
        setUser(user);
      },
      []
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    if(user !== null)
      console.log('user value changed', user.uid);
  }, [user]);
  return (
    <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>
  );
};
