import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Header from '../../components/header/header.component';
import Button from '../../components/button/button.component';
import FormLabel from '../../components/form-label/form-label.component';
import FormInput from '../../components/form-input/form-input.component';
import InputContainer from '../../components/input-container/input-container';

import { createUser } from '../../firebase/firebase-auth';

const initialState = {
  name: '',
  email: '',
  password: '',
};
function SignUp() {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();
  const { state } = useLocation();
  const path = state ? state.path : null;

  function handleChange(event) {
    const key = event.target.name;
    const inputValue = event.target.value;

    setForm({ ...form, [key]: inputValue });
  }

  function handleSubmit(event) {
    event.preventDefault();
    createUser(form.name, form.email, form.password);
    navigate(path || '/', { replace: true });
    setForm(initialState);
  }

  return (
    <div className='form__container'>
      <Header header='SIGN UP' />
      <form onSubmit={handleSubmit}>
        <InputContainer className='input__container'>
          <FormLabel htmlFor='text' title='Name' />
          <FormInput
            value={form.name}
            name='name'
            id='text'
            type='text'
            onChange={handleChange}
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
          />
        </InputContainer>

        <div className='button__container'>
          <Button
            type='submit'
            handleClick={handleSubmit}
            title='Sign up'
            classname='btn-signup'
          />
        </div>
      </form>
    </div>
  );
}

export default SignUp;
