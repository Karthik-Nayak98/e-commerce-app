import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Header from '../../components/header/header.component';
import Button from '../../components/button/button.component';
import FormLabel from '../../components/form-label/form-label.component';
import FormInput from '../../components/form-input/form-input.component';
import InputContainer from '../../components/input-container/input-container';

import { createUser } from '../../firebase/firebase-auth';
import { updateProfile } from 'firebase/auth';
import { auth, db} from '../../firebase/firebase.utils'
import { setDoc, doc } from 'firebase/firestore';


const initialState = {
  name: '',
  email: '',
  password: '',
};

function SignUp() {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { state } = useLocation();
  const path = state ? state.path : null;

  function handleChange(event) {
    const key = event.target.name;
    const inputValue = event.target.value;

    setForm({ ...form, [key]: inputValue });
    setError('')
  }

  // Creates a initial object for the signed up user.
  const setInitialCart = async (uid) =>{
    const userState = {
      cartItems: [],
      totalItems: 0,
      totalPrice: 0,
    };

    // uid is the document id.
    const document = doc(db, 'usercart', uid)
    await setDoc(document, userState)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createUser(form.name, form.email, form.password);
      await updateProfile(auth.currentUser, { displayName: form.name });

      setInitialCart(auth.currentUser.uid)
      setForm(initialState);
      navigate(path || '/', { replace: true });
    }
    catch(err){
      if(err.code === 'auth/email-already-in-use')
        setError('Email is already present.')
      else if(err.code === 'auth/weak-password')
        setError('Password should have atleast 6 characters.')
    }
  }

  return (
    <div className='form__container'>
      <Header header='SIGN UP' />
      {error.length?<p className='error'>{error}</p>:null}
      <form onSubmit={handleSubmit}>
        <InputContainer className='input__container'>
          <FormLabel htmlFor='text' title='Name' />
          <FormInput
            value={form.name}
            name='name'
            id='text'
            type='text'
            onChange={handleChange}
            required
          />
        </InputContainer>

        <InputContainer className='input__container'>
          <FormLabel htmlFor='email' title='Email' />
          <FormInput
            value={form.email}
            name='email'
            id='email'
            type='email'
            onChange={handleChange}
            required
          />
        </InputContainer>

        <InputContainer className='input__container'>
          <FormLabel htmlFor='password' title='Password' />
          <FormInput
            value={form.password}
            name='password'
            id='password'
            type='password'
            onChange={handleChange}
            required
          />
        </InputContainer>

        <div className='button__container'>
          <Button
            type='submit'
            // handleClick={handleSubmit}
            title='Sign up'
            classname='btn-signup'
          />
        </div>
      </form>
    </div>
  );
}

export default SignUp;
