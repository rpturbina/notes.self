import React from 'react';

import LocaleContext from '../context/LocaleContext';

const LoadingPage = () => {
  const { locale } = React.useContext(LocaleContext);
  return (
    <div className='loading-page'>
      <p className='loading-text'>{locale === 'id' ? 'Mohon tunggu  ...' : 'Please wait ...'}</p>
    </div>
  );
};

export default LoadingPage;
