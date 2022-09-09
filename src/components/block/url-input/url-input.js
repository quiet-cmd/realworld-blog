import React from 'react';

import { errorClass } from '../class-names/class-names';

const UrlInput = ({ register, name, opt = {}, label, errors, defaultValue }) => {
  const url = {
    require: true,
    pattern: {
      value: /[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/,
      message: 'Entered urk does not match url format',
    },
  };
  return (
    <label>
      {label}
      <input
        {...register(name, { ...url, ...opt })}
        placeholder={label}
        defaultValue={defaultValue}
        className={errorClass(errors[name])}
      />
      <strong>{errors[name]?.message}</strong>
    </label>
  );
};

export default UrlInput;
