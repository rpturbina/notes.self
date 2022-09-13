import PropTypes from 'prop-types';
import React from 'react';

const LoadingSpace = ({ children }) => {
  return (
    <section className='loading-space'>
      <p className='loading-text'>{children}</p>
    </section>
  );
};

LoadingSpace.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoadingSpace;
