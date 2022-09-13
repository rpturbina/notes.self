import PropTypes from 'prop-types';
import React from 'react';

import LocaleContext from '../context/LocaleContext';
import useInput from '../hooks/useInput';

const RegisterInput = ({ register }) => {
  const [name, onNameChangeHandler] = useInput('');
  const [email, onEmailChangeHandler] = useInput('');
  const [password, onPasswordChangeHandler] = useInput('');
  const [confirmPassword, onConfirmPasswordChangeHandler] = useInput('');
  const { locale } = React.useContext(LocaleContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (password.length < 6) {
      alert(
        locale === 'id'
          ? 'Password minimal harus 6 karakter!'
          : 'Password must be at least 6 characters!',
      );
      return;
    }

    if (password !== confirmPassword) {
      alert(
        locale === 'id'
          ? 'Password dan Confirm Password harus sama!'
          : 'Password and Confirm Password must be the same!',
      );
      return;
    }

    register({ name, email, password });
  };

  return (
    <form className='input-register' onSubmit={onSubmitHandler}>
      <label htmlFor='name'>Nama</label>
      <input type='text' id='name' value={name} onChange={onNameChangeHandler} required />
      <label htmlFor='email'>Email</label>
      <input type='email' id='email' value={email} onChange={onEmailChangeHandler} required />
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        id='password'
        value={password}
        onChange={onPasswordChangeHandler}
        required
      />
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
