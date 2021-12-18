import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from './firebase.utils';

export const createUser = (name, email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // const user = userCredential.user;
      // console.log('create user', user);
      return updateProfile(auth.currentUser, { displayName: name });
    })
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};

export const signInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const userSignOut = () => {
  return signOut(auth);
};
