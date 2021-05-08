import '../src/styles/global.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      date: /Date$/,
    },
  },
  themes: {
    default: 'light',
    list: [
      {
        name: 'light',
        class: '',
        color: '#bdbdcb',
      },
      {
        name: 'dark',
        class: 'dark-theme',
        color: '#393e46',
      },
    ],
  },
};
