import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Header from '../../components/header/header.component';
import Button from '../../components/button/button.component';
import InputContainer from '../../components/input-container/input-container';
import FormInput from '../../components/form-input/form-input.component';
import FormLabel from '../../components/form-label/form-label.component';
import Spinner from '../../components/spinners/spinner';

import { signInWithEmail } from '../../firebase/firebase-auth';

import './signin.styles.css';

const initialState = {
  email: '',
  password: '',
};

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('')

  const navigate = useNavigate();
  const { state } = useLocation();
  const path = state ? state.path : null;

  function handleChange(event) {
    const key = event.target.name;
    const inputValue = event.target.value;

    setForm({ ...form, [key]: inputValue });
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    try {
      await signInWithEmail(form.email, form.password);
      setIsLoading(false)
      navigate(path || '/');
    } catch (err) {
      if(err.code === 'auth/wrong-password')
        setError('Please enter the correct password.')
      else if(err.code === 'auth/user-not-found')
        setError('User is not found.')
      setIsLoading(false)
    }
  };

  return (
    <div className='form__container'>
      <Header header='SIGN IN' />
      <p className='error'>{error}</p>
      <form className='signin-form' onSubmit={handleSubmit}>
        <InputContainer className='input__container'>
          <FormLabel htmlFor='email' title='Email' />
          <FormInput
            name='email'
            id='email'
            type='email'
            value={form.email}
            onChange={handleChange}
            required
          />
        </InputContainer>

        <InputContainer className='input__container'>
          <FormLabel htmlFor='password' title='Password' />
          <FormInput
            name='password'
            id='password'
            type='password'
            value={form.password}
            onChange={handleChange}
            required
          />
        </InputContainer>
        <Link to='/signup'>
          <p className='signup'>Do not have an account? Register here!!</p>
        </Link>
        {isLoading? <Spinner/>:null}
        <div className='button__container'>
          <Button
            type='submit'
            title='Sign in'
            classname={`btn-signup ${isLoading? 'disable':''}`}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default SignIn;
