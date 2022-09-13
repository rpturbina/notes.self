import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import LocaleContext from '../context/LocaleContext';

const NoMatchPage = () => {
  const { locale } = React.useContext(LocaleContext);
  return (
    <section className='not-found'>
      <Helmet>
        <title>404 {locale === 'id' ? 'tidak ditemukan' : 'not found'}</title>
      </Helmet>
      <h2 className='not-found__code'>404</h2>
      {locale === 'id' ? (
        <>
          <p className='not-found__text'>Halaman tidak ditemukan</p>
          <Link to='/'>Kembali ke halaman utama</Link>
        </>
      ) : (
        <>
          <p className='not-found__text'>Page not Found</p>
          <Link to='/'>Back to home page</Link>
        </>
      )}
    </section>
  );
};

export default NoMatchPage;
