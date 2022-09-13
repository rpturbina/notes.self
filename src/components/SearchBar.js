import PropTypes from 'prop-types';
import React from 'react';

const SearchBar = ({ keyword, keywordChange }) => {
  return (
    <section className='search-bar'>
      <input
        type='text'
        placeholder='Cari berdasarkan judul...'
        value={keyword}
        onChange={(event) => keywordChange(event.target.value)}
      />
    </section>
  );
};

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
