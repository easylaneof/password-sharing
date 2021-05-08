import { MouseEventHandler } from 'react';

export type ButtonProps = {
  text: string;
  onClick: MouseEventHandler;

  disabled?: boolean;
  loading?: boolean;
  className?: string;
};
