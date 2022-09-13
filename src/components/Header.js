import PropTypes from 'prop-types';
import React from 'react';
import { BsTranslate, BsMoon as MoonIcon, BsSun as SunIcon } from 'react-icons/bs';
import { IoIosLogOut } from 'react-icons/io';
import { Link } from 'react-router-dom';

import LocaleContext from '../context/LocaleContext';
import ThemeContext from '../context/ThemeContext';
import Navigation from './Navigation';

const Header = ({ logout, isAuthed, name }) => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const { toggleLocale } = React.useContext(LocaleContext);
  return (
    <header>
      <h1>
        <Link to='/'>notes.self</Link>
      </h1>
      {isAuthed && <Navigation />}
      <button className='toggle-locale' onClick={toggleLocale}>
        <BsTranslate />
      </button>
      <button className='toggle-theme' onClick={toggleTheme}>
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      </button>
      {isAuthed && (
        <button className='button-logout' type='button' onClick={logout}>
          <IoIosLogOut />
          {name}
        </button>
      )}
    </header>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export default Header;
