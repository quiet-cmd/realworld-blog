import React from 'react';

import { errorClass } from '../class-names/class-names';

const CheckboxInput = ({ register, name, opt = {}, label, errors, defaultValue }) => {
  const checkbox = {
    required: { value: true, message: 'Very important checkbox' },
  };
  return (
    <label>
      <input
        {...register(name, { ...checkbox, ...opt })}
        placeholder={label}
        defaultValue={defaultValue}
        type="checkbox"
        className={errorClass(errors[name])}
      />
      {label}
      <strong>{errors[name]?.message}</strong>
    </label>
  );
};

export default CheckboxInput;
