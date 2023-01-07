import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  Button,
  FormInput,
  FormLabel,
  Header,
  InputContainer,
  Spinner,
} from '../../components';

import { updateProfile } from 'firebase/auth';
import { createUser } from '../../firebase/firebase-auth';
import { auth } from '../../firebase/firebase.utils';

import '../Login/Login.css';

const initialState = {
  name: '',
  email: '',
  password: '',
};

function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { state } = useLocation();
  const path = state ? state.path : null;

  function handleChange(event) {
    const key = event.target.name;
    const inputValue = event.target.value;

    setForm({ ...form, [key]: inputValue });
    setError('');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await createUser(form.name, form.email, form.password);
      await updateProfile(auth.currentUser, { displayName: form.name });
      setIsLoading(false);
      setForm(initialState);
      navigate(path || '/', { replace: true });
    } catch (err) {
      if (err.code === 'auth/email-already-in-use')
        setError('Email is already present.');
      else if (err.code === 'auth/weak-password')
        setError('Password should have atleast 6 characters.');
      setIsLoading(false);
    }
  };

  return (
    <div className='form__container'>
      <Header header='SIGN UP' />
      {error.length ? <p className='error'>{error}</p> : null}
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

        {isLoading ? <Spinner /> : null}
        <div className='button__container'>
          <Button
            type='submit'
            title='Sign up'
            classname={`btn-signup ${isLoading ? 'disable' : ''}`}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
}

export default SignUp;
