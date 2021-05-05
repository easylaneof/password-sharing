import React from 'react';

import cx from 'classnames';

import { Text } from 'components/atoms/Text';

import { ButtonProps } from './Button.interface';

import s from './Button.module.scss';

export const Button = ({ text, onClick, className, disabled }: ButtonProps): JSX.Element => {
  return (
    <button className={cx(s.container, className)} type="button" onClick={onClick} disabled={disabled}>
      <Text text={text} color="white" />
    </button>
  );
};
