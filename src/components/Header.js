import PropTypes from 'prop-types';
import React from 'react';
import { IoIosLogOut } from 'react-icons/io';
import { Link } from 'react-router-dom';

import Navigation from './Navigation';

const Header = ({ logout, isAuthed }) => {
  return (
    <header>
      <h1>
        <Link to='/'>notes.self</Link>
      </h1>
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
