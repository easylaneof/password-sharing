import React from 'react';

import cx from 'classnames';

import { HeadlineProps } from './Headline.interface';
import s from './Headline.module.scss';

export const Headline = ({ text, type = 'headline2', className }: HeadlineProps): JSX.Element => {
  const tag = type === 'headline1' ? 'h1' : 'h2';

  return React.createElement(tag, { className: cx(s.container, className, type) }, text);
};
