import React from 'react';

import cx from 'classnames';

import { useDarkMode } from 'lib/dark-mode';

import { ThemeSwitcherProps } from './ThemeSwitcher.interface';
import s from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps): JSX.Element => {
  const [darkMode, setDarkMode] = useDarkMode();

  const handleChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={cx(s.container, className)}>
      <input type="checkbox" onChange={handleChange} value={darkMode.toString()} aria-label="Theme switcher" />
      <div />
    </label>
  );
};
