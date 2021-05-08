import { useMediaMatch } from 'lib/media';

export const usePrefersDarkMode = () => useMediaMatch('(prefers-color-scheme: dark)');
