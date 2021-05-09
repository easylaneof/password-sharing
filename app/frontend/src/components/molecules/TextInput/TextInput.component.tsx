import React, { forwardRef, useState } from 'react';

import { motion, Variants } from 'framer-motion';
import cx from 'classnames';

import { Text } from 'components/atoms/Text';
import { Headline } from 'components/atoms/Headline';

import { TextInputProps, TextInputTypes } from './TextInput.interface';

import s from './TextInput.module.scss';
import { EyeIcon } from '../../atoms/EyeIcon';

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
    { setValue, error, label, value, className, readonly, name, onChange, placeholder, type = 'text', children },
    ref
  ): JSX.Element => {
    const [passwordVisible, setPasswordVisible] = useState(false);

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

    const inputType = (() => {
      if (type === 'password') {
        return passwordVisible ? 'text' : 'password';
      }

      return type;
    })();

    return (
      <label className={cx(s.container, className)}>
        <Headline text={label} type="h2" asSpan />

        <div className={s.inputContainer}>
          <div className={s.eyeContainer}>
            <input
              name={name}
              readOnly={readonly}
              ref={ref}
              className={cx(s.input, error && s.error)}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              type={inputType}
              autoComplete={mapInputTypeToAutocomplete[type]}
              aria-errormessage={error}
              aria-invalid={Boolean(error)}
              aria-label={label}
            />

            {type === 'password' && <EyeIcon open={passwordVisible} setOpen={setPasswordVisible} className={s.eye} />}
          </div>

          {children}
        </div>

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
