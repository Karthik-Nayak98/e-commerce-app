import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase.utils';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slice/userSlice';

const useUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user
        ? dispatch(setUser(user.refreshToken))
        : dispatch(setUser(undefined));
    });

    return () => unsubscribe;
  }, [dispatch]);
};

export default useUser;
