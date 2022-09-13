import PropTypes from 'prop-types';
import React from 'react';

import useInput from '../hooks/useInput';

const LoginInput = ({ login }) => {
  const [email, onEmailChangeHandler] = useInput('');
  const [password, onPasswordChangeHandler] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();

    login({ email, password });
  };
  return (
    <form className='input-login' onSubmit={onSubmitHandler}>
      <label htmlFor='email'>Email</label>
      <input type='email' id='name' value={email} onChange={onEmailChangeHandler} />
      <label htmlFor='password'>Password</label>
      <input type='password' id='password' value={password} onChange={onPasswordChangeHandler} />
      <button type='submit'>Login</button>
    </form>
  );
};

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
