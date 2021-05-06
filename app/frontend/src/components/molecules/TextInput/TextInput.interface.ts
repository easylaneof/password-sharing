import React from 'react';

export type TextInputTypes = 'text' | 'password';

export type TextInputProps = {
  value?: string;

  setValue?: (value: string) => void;
  onChange?: React.ChangeEventHandler;

  type?: TextInputTypes;
  readonly?: boolean;
  name?: string;
  className?: string;
  placeholder?: string;
  children?: React.ReactNode;
};
