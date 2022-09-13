import PropTypes from 'prop-types';
import React from 'react';
import { BsMoon as MoonIcon, BsSun as SunIcon } from 'react-icons/bs';
import { IoIosLogOut } from 'react-icons/io';
import { Link } from 'react-router-dom';

import ThemeContext from '../context/ThemeContext';
import Navigation from './Navigation';

const Header = ({ logout, isAuthed }) => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  return (
    <header>
      <h1>
        <Link to='/'>notes.self</Link>
      </h1>
      <button className='toggle-theme' onClick={toggleTheme}>
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      </button>
      {isAuthed && (
        <>
          <Navigation />
          <button className='button-logout' type='button' onClick={logout}>
            <IoIosLogOut />
            Logout
          </button>
        </>
      )}
    </header>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool.isRequired,
};

export default Header;
