import React, { forwardRef } from 'react';

import cx from 'classnames';

import { TextInputProps } from './TextInput.interface';

import s from './TextInput.module.scss';

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ setValue, value, className, readonly, name, onChange, placeholder, type }, ref): JSX.Element => {
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      if (setValue) {
        setValue(e.target.value);
      }

      if (onChange) {
        onChange(e);
      }
    };

    return (
      <input
        name={name}
        readOnly={readonly}
        ref={ref}
        className={cx(s.container, className)}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        type={type}
      />
    );
  }
);
