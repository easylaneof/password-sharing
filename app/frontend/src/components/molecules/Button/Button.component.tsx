import React from 'react';

import cx from 'classnames';
import { motion, Transition } from 'framer-motion';

import { Text } from 'components/atoms/Text';

import { ButtonProps } from './Button.interface';

import s from './Button.module.scss';

const firstAnimation = {
  y: [-4, 0, 4, 0, -4],
};

const secondAnimation = {
  y: [0, 4, 0, -4, 0],
};

const thirdAnimation = {
  y: [4, 0, -4, 0, 4],
};

const transition: Transition = {
  duration: 0.5,
  repeat: Infinity,
  ease: 'easeIn',
};

export const Button = ({ text, onClick, className, disabled, loading = false }: ButtonProps): JSX.Element => {
  return (
    <button className={cx(s.container, className)} type="button" onClick={onClick} disabled={disabled || loading}>
      <div className={cx(s.circlesContainer, !loading && s.hidden)}>
        <motion.div transition={transition} animate={firstAnimation} className={s.circle} />
        <motion.div transition={transition} animate={secondAnimation} className={s.circle} />
        <motion.div transition={transition} animate={thirdAnimation} className={s.circle} />
      </div>

      <Text text={text} color="white" className={cx(s.text, loading && s.hidden)} />
    </button>
  );
};
