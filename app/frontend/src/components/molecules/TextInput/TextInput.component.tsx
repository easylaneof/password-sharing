import React, { forwardRef, useState } from 'react';

import cx from 'classnames';

import { Text } from 'components/atoms/Text';
import { EyeIcon } from 'components/atoms/EyeIcon';
import { Headline } from 'components/atoms/Headline';

import { TextInputProps, TextInputTypes } from './TextInput.interface';

import s from './TextInput.module.scss';

const mapInputTypeToAutocomplete: Record<TextInputTypes, string> = {
  email: 'email',
  password: 'current-password',
  text: 'none',
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      defaultValue,
      setValue,
      error,
      label,
      value,
      className,
      readonly,
      name,
      onChange,
      placeholder,
      type = 'text',
      children,
    },
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
              defaultValue={defaultValue}
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

        {error && <Text className={s.errorText} type="caption" text={error} color="error" />}
      </label>
    );
  }
);
