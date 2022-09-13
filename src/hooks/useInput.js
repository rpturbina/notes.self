import React from 'react';

const useInput = (defaultValue) => {
  const [value, setValue] = React.useState(defaultValue);

  const onValueChangeHandler = (event) => {
    setValue(event.target.value);
  };
  return [value, onValueChangeHandler];
};

export default useInput;
