import React from 'react';

import cx from 'classnames';

import { Text } from 'components/atoms/Text';

import { CheckboxProps } from './Checkbox.interface';
import s from './Checkbox.module.scss';

export const Checkbox = ({ checked, label, setChecked, className }: CheckboxProps): JSX.Element => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <label className={cx(s.container, className)}>
      <input type="checkbox" onChange={handleChange} className={s.checkbox} checked={checked} />
      <div className={s.box} />
      <Text text={label} type="caption" />
    </label>
  );
};
