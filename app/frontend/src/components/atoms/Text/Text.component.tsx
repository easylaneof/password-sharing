import React from 'react';

import cx from 'classnames';

import { TextProps } from './Text.interface';
import s from './Text.module.scss';

export const Text = ({ text, className, type = 'body', color = 'text' }: TextProps): JSX.Element => {
  return (
    <span className={cx(s.container, className, type)} style={{ color: `var(--${color})` }}>
      {text}
    </span>
  );
};
