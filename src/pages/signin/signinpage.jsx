import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Header from '../../components/header/header.component';
import Button from '../../components/button/button.component';
import InputContainer from '../../components/input-container/input-container';
import FormInput from '../../components/form-input/form-input.component';
import FormLabel from '../../components/form-label/form-label.component';

import { signInWithEmail } from '../../firebase/firebase-auth';

import './signin.styles.css';

const initialState = {
  email: '',
  password: '',
};

const SignIn = () => {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();
  const { state } = useLocation();
  const path = state ? state.path : null;

  function handleChange(event) {
    const key = event.target.name;
    const inputValue = event.target.value;

    setForm({ ...form, [key]: inputValue });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmail(form.email, form.password);
      navigate(path || '/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='form__container'>
      <Header header='SIGN IN' />
      <form className='signin-form' onSubmit={handleSubmit}>
        <InputContainer className='input__container'>
          <FormLabel htmlFor='email' title='Email' />
          <FormInput
            name='email'
            id='email'
            type='email'
            value={form.email}
            onChange={handleChange}
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
          />
        </InputContainer>
        <Link to='/signup'>
          <p>Do not have an account? Register here!!</p>
        </Link>
        <div className='button__container'>
          <Button type='submit' title='Sign in' classname='btn-signup' />
        </div>
      </form>
    </div>
  );
};

export default SignIn;
