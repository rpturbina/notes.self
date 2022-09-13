import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import LocaleContext from './context/LocaleContext';
import ThemeContext from './context/ThemeContext';
import useAuth from './hooks/useAuth';
import useLocale from './hooks/useLocale';
import useTheme from './hooks/useTheme';
import LoadingPage from './pages/LoadingPage';
import LoginPage from './pages/LoginPage';
import NoMatchPage from './pages/NoMatchPage';
import RegisterPage from './pages/RegisterPage';
import protectedRoutes from './routes/protectedRoutes';

function App() {
  const { initializing, authedUser, onLoginSuccess, onLogout } = useAuth();
  const { themeContextValue } = useTheme();
  const { localeContextValue } = useLocale();

  return (
    <LocaleContext.Provider value={localeContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        {initializing ? (
          <LoadingPage />
        ) : (
          <div className='app-container'>
            <Header
              logout={onLogout}
              isAuthed={authedUser !== null}
              name={authedUser?.name || ''}
            />
            <main>
              <Routes>
                {authedUser ? (
                  <>
                    <Route path='/login' element={<Navigate to='/' replace />} />
                    {protectedRoutes.map((route) => (
                      <Route key={route.path} path={route.path} element={<route.element />} />
                    ))}
                  </>
                ) : (
                  <>
                    <Route path='/' element={<Navigate to='/login' replace />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/login' element={<LoginPage loginSuccess={onLoginSuccess} />} />
                  </>
                )}
                <Route path='*' element={<NoMatchPage />} />
              </Routes>
            </main>
          </div>
        )}
      </ThemeContext.Provider>
    </LocaleContext.Provider>
  );
}

export default App;
