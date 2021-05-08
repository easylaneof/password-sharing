import React from 'react';

import cx from 'classnames';

import { motion, Variants } from 'framer-motion';

import { Text } from 'components/atoms/Text';
import { Headline } from 'components/atoms/Headline';

import { NumberInputProps } from './NumberInput.interface';

import s from './NumberInput.module.scss';

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

const Error = motion(Text);

export const NumberInput = ({
  value,
  setValue,
  className,
  label,
  max,
  min = 0,
  error,
}: NumberInputProps): JSX.Element => {
  const handleValueChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(Number(e.target.value));
  };

  return (
    <div className={cx(s.container, className)}>
      <Headline text={label} type="h2" className={s.label} asSpan />

      <input
        type="number"
        min={min}
        max={max}
        placeholder="0"
        className={cx(s.input, error && s.error)}
        value={value}
        onChange={handleValueChange}
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
    </div>
  );
};
