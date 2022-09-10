import React from 'react';
import { Link } from 'react-router-dom';

import Navigation from './Navigation';

const Header = () => {
    return (
        <header>
            <h1>
                <Link to="/">notes.self</Link>
            </h1>
            <Navigation />
        </header>
    );
};

export default Header;
