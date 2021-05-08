import React from 'react';

import { motion, Variants } from 'framer-motion';
import cx from 'classnames';

import { Headline } from 'components/atoms/Headline';
import { Text } from 'components/atoms/Text';

import { TimeInputProps } from './TimeInput.interface';

import s from './TimeInput.module.scss';

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

export const TimeInput = ({
  hours,
  minutes,
  setHours,
  setMinutes,
  className,
  error,
  label,
}: TimeInputProps): JSX.Element => {
  const handleHoursChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setHours(e.target.value);
  };

  const handleMinutesChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setMinutes(e.target.value);
  };

  return (
    <div className={cx(s.container, className)}>
      <Headline text={label} type="h2" className={s.label} asSpan />

      <div className={s.inputsContainer}>
        <input
          type="number"
          min={0}
          max={23}
          placeholder="00"
          className={cx(s.input, error && s.error)}
          value={hours}
          onChange={handleHoursChange}
        />
        <div className={s.circlesContainer}>
          <div className={s.circle} />
          <div className={s.circle} />
        </div>
        <input
          type="number"
          min={0}
          max={59}
          placeholder="00"
          className={cx(s.input, error && s.error)}
          value={minutes}
          onChange={handleMinutesChange}
        />
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
    </div>
  );
};
