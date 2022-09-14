import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import RegisterInput from '../components/RegisterInput';
import LocaleContext from '../context/LocaleContext';
import { register } from '../utils/network-data';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { locale } = React.useContext(LocaleContext);

  const onRegisterHandler = async (user) => {
    const { error } = await register(user);

    if (!error) {
      alert(locale === 'id' ? 'Akun berhasil dibuat.' : 'Account has been created successfully.');
      navigate('/');
    }
  };
  return (
    <section className='register-page'>
      <h2>
        {locale === 'id' ? 'Isi form untuk mendaftar akun.' : 'Fill the form to register account.'}
      </h2>
      <RegisterInput register={onRegisterHandler} />
      {locale === 'id' ? (
        <p>
          Sudah punya akun? <Link to='/'>Login di sini</Link>
        </p>
      ) : (
        <p>
          Already have an account? <Link to='/'>Login here</Link>
        </p>
      )}
    </section>
  );
};

export default RegisterPage;
