import React from 'react';

import { ButtonProps } from './Button.interface';

import s from './Button.module.scss';

export const Button = ({ text }: ButtonProps): JSX.Element => {
  return (
    <button className={s.container}>
      {text}
    </button>
  );
};
