import React, { forwardRef } from 'react';

import { motion, Variants } from 'framer-motion';
import cx from 'classnames';

import { Text } from 'components/atoms/Text';
import { Headline } from 'components/atoms/Headline';

import { TextInputProps, TextInputTypes } from './TextInput.interface';

import s from './TextInput.module.scss';

const errorVariants: Variants = {
  appear: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  initial: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
};

const mapInputTypeToAutocomplete: Record<TextInputTypes, string> = {
  email: 'email',
  password: 'current-password',
  text: 'none',
};

const Error = motion(Text);

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { setValue, error, label, value, className, readonly, name, onChange, placeholder, type = 'text' },
    ref
  ): JSX.Element => {
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      if (readonly) {
        return;
      }

      if (setValue) {
        setValue(e.target.value);
      }

      if (onChange) {
        onChange(e);
      }
    };

    return (
      <label className={s.container}>
        <Headline text={label} type="h2" asSpan />

        <input
          name={name}
          readOnly={readonly}
          ref={ref}
          className={cx(s.input, className, error && s.error)}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          type={type}
          autoComplete={mapInputTypeToAutocomplete[type]}
          aria-errormessage={error}
          aria-invalid={Boolean(error)}
          aria-label={label}
        />

        {error && (
          <Error
            className={s.errorText}
            variants={errorVariants}
            initial="initial"
            animate={error ? 'appear' : 'initial'}
            type="caption"
            text={error}
            color="error"
          />
        )}
      </label>
    );
  }
);
