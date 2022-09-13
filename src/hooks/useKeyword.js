import React from 'react';
import { useSearchParams } from 'react-router-dom';

const useKeyword = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get('keyword') || '';
  });

  const onKeywordChangeHandler = (keyword) => {
    setSearchParams({ keyword });
    setKeyword(keyword);
  };

  return [keyword, onKeywordChangeHandler];
};

export default useKeyword;
