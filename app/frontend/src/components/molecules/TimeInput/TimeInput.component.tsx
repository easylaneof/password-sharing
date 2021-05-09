import React from 'react';

import cx from 'classnames';

import { Headline } from 'components/atoms/Headline';
import { Text } from 'components/atoms/Text';

import { TimeInputProps } from './TimeInput.interface';

import s from './TimeInput.module.scss';

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

      {error && <Text className={s.errorText} type="caption" text={error} color="error" />}
    </div>
  );
};
