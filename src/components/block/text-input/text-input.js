import React from 'react';

import { errorClass } from '../class-names/class-names';

const TextInput = ({ register, name, opt = {}, label, errors, defaultValue }) => {
  const username = {
    required: true,
    minLength: { value: 3, message: 'Min length is 3' },
    maxLength: { value: 20, message: 'Max length is 20' },
    pattern: {
      value: /^[a-z0-9_-]{3,21}$/,
      message: 'Invalid characters',
    },
  };
  return (
    <label>
      {label}
      <input
        {...register(name, { ...username, ...opt })}
        placeholder={label}
        defaultValue={defaultValue}
        className={errorClass(errors[name])}
      />
      <strong>{errors[name]?.message}</strong>
    </label>
  );
};

export default TextInput;
