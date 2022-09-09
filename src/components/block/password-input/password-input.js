import React from 'react';

import { errorClass } from '../class-names/class-names';

const PasswordInput = ({ register, name, opt = {}, label, errors, defaultValue }) => {
  const password = {
    required: true,
    minLength: { value: 6, message: 'Min length is 6' },
    maxLength: { value: 40, message: 'Max length is 40' },
    pattern: {
      value: /^\S+$/,
      message: 'Password must not be empty',
    },
  };
  return (
    <label>
      {label}
      <input
        {...register(name, { ...password, ...opt })}
        placeholder={label}
        defaultValue={defaultValue}
        type="password"
        className={errorClass(errors[name])}
      />
      <strong>{errors[name]?.message}</strong>
    </label>
  );
};

export default PasswordInput;
