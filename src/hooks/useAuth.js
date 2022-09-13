import React from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserLogged, putAccessToken } from '../utils/network-data';

const useAuth = () => {
  const navigate = useNavigate();
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);

  React.useEffect(() => {
    getUserLogged().then(({ data }) => {
      setAuthedUser(data);
      setInitializing(false);
    });
  }, []);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);

    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken('');
    navigate('/');
  };

  return {
    initializing,
    authedUser,
    onLoginSuccess,
    onLogout,
  };
};

export default useAuth;
