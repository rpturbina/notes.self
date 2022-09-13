import React from 'react';

const useLocale = () => {
  const [locale, setLocale] = React.useState(() => {
    return localStorage.getItem('locale') || 'id';
  });

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === 'id' ? 'en' : 'id';
      localStorage.setItem('locale', newLocale);
      return newLocale;
    });
  };

  const localeContextValue = React.useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  }, [locale]);

  return { localeContextValue };
};

export default useLocale;
