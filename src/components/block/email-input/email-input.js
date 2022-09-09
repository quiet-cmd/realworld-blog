import React from 'react';

import { errorClass } from '../class-names/class-names';

const EmailInput = ({ register, name, opt = {}, label, errors, defaultValue }) => {
  const email = {
    required: true,
    pattern: {
      value: /\S+@\S+\.\S+$/,
      message: 'Entered value does not match email format',
    },
  };
  return (
    <label>
      {label}
      <input
        {...register(name, { ...email, ...opt })}
        placeholder={label}
        defaultValue={defaultValue}
        type="email"
        className={errorClass(errors[name])}
      />
      <strong>{errors[name]?.message}</strong>
    </label>
  );
};

export default EmailInput;
