import PropTypes from 'prop-types';
import React from 'react';

import useInput from '../hooks/useInput';

const RegisterInput = ({ register }) => {
  const [name, onNameChangeHandler] = useInput('');
  const [email, onEmailChangeHandler] = useInput('');
  const [password, onPasswordChangeHandler] = useInput('');
  const [confirmPassword, onConfirmPasswordChangeHandler] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Password and password confirm harus sama');
      return;
    }

    register({ name, email, password });
  };

  return (
    <form className='input-register' onSubmit={onSubmitHandler}>
      <label htmlFor='name'>Nama</label>
      <input type='text' id='name' value={name} onChange={onNameChangeHandler} />
      <label htmlFor='email'>Email</label>
      <input type='email' id='email' value={email} onChange={onEmailChangeHandler} />
      <label htmlFor='password'>Password</label>
      <input type='password' id='password' value={password} onChange={onPasswordChangeHandler} />
      <label htmlFor='confirm-password'>Confirm Password</label>
      <input
        type='password'
        id='confirm-password'
        value={confirmPassword}
        onChange={onConfirmPasswordChangeHandler}
      />
      <button type='submit'>Register</button>
    </form>
  );
};

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
