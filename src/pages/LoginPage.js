import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import LoginInput from '../components/LoginInput';
import LocaleContext from '../context/LocaleContext';
import { login } from '../utils/network-data';

const LoginPage = ({ loginSuccess }) => {
  const { locale } = React.useContext(LocaleContext);
  const onLogin = async ({ email, password }) => {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  };
  return (
    <section className='login-page'>
      <Helmet>
        <title>{locale === 'id' ? 'Halaman Login' : 'Login Page'} - notes.self</title>
      </Helmet>
      <h2>
        {locale === 'id' ? 'Yuk, login untuk menggunakan aplikasi.' : 'Login to use app, please.'}
      </h2>
      <LoginInput login={onLogin} />
      {locale === 'id' ? (
        <p>
          Belum punya akun? <Link to='/register'>Daftar di sini</Link>
        </p>
      ) : (
        <p>
          Don&#39;t have an account? <Link to='/register'>Register here</Link>
        </p>
      )}
    </section>
  );
};

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
