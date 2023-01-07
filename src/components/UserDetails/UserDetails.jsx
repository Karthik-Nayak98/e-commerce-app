import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Header } from '../../components';
import { userSignOut } from '../../firebase/firebase-auth';
import { auth } from '../../firebase/firebase.utils';
import { setShow, setUser } from '../../redux/slice/userSlice';
import './UserDetails.css';

export default function UserDetails() {
  const [info, setInfo] = useState({});
  const { uid, show } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (uid != null) {
      const profile = auth.currentUser;
      const name = profile.displayName;
      const email = profile.email;
      setInfo({ name, email });
    }
  }, [uid]);

  function handleClick() {
    dispatch(setShow(!show));
  }

  function handleSignout() {
    userSignOut();
    dispatch(setUser(null));
    dispatch(setShow(!show));
    navigate('/', { replace: true });
  }
  return (
    <section className={`modal ${show ? '' : 'hide'}`}>
      <Header header='Profile Details' />
      <IoClose onClick={handleClick} className='close-icon' size='1.2rem' />
      <div className='user-container'>
        <span className='user__label'>Name:</span>
        <span className='user__info'>{info.name}</span>
      </div>
      <div className='user-container'>
        <span className='user__label'>Email:</span>
        <span>{info.email}</span>
      </div>
      <Button onClick={handleSignout} classname='button btn-cart' title='Signout' />
    </section>
  );
}
