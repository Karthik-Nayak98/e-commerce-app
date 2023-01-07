import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase/firebase.utils';
import { setUser } from '../redux/slice/userSlice';

const useUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        console.log(user);
        user ? dispatch(setUser(user.uid)) : dispatch(setUser(undefined));
      },
      []
    );

    return unsubscribe;
  }, [dispatch]);
};

export default useUser;
