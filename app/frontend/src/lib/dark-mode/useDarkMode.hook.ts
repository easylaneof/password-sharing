import { useLocalStorage } from 'lib/localstorage';

import { useEffect } from 'react';
import { usePrefersDarkMode } from './usePrefersDarkMode.hook';

const className = 'dark-theme';
const element = window.document.body;

export const useDarkMode = () => {
  const [enabled, setEnabled] = useLocalStorage<boolean>('dark-mode', false);
  const prefersDarkMode = usePrefersDarkMode();

  const isDarkMode = enabled ?? prefersDarkMode;

  // if it's dark mode, we want to set className before the first render
  if (isDarkMode) {
    element.classList.add(className);
  }

  useEffect(() => {
    if (isDarkMode) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  }, [enabled, isDarkMode]);

  return [enabled, setEnabled] as const;
};
