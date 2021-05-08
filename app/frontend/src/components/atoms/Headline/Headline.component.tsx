import React from 'react';

import cx from 'classnames';

import { HeadlineProps } from './Headline.interface';
import s from './Headline.module.scss';

export const Headline = ({ text, type = 'h3', className, asSpan = false }: HeadlineProps): JSX.Element => {
  return React.createElement(asSpan ? 'span' : type, { className: cx(s.container, className, type) }, text);
};
