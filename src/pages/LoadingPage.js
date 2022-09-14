import React from 'react';
import { Helmet } from 'react-helmet';

import LocaleContext from '../context/LocaleContext';

const LoadingPage = () => {
  const { locale } = React.useContext(LocaleContext);
  return (
    <div className='loading-page'>
      <Helmet>
        <title>{locale === 'id' ? 'Mohon tunggu  ...' : 'Please wait ...'} - notes.self</title>
      </Helmet>
      <p className='loading-text'>{locale === 'id' ? 'Mohon tunggu  ...' : 'Please wait ...'}</p>
    </div>
  );
};

export default LoadingPage;
