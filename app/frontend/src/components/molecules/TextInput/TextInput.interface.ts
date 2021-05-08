import React from 'react';

export type TextInputTypes = 'email' | 'text' | 'password';

export type TextInputProps = {
  label: string;
  placeholder: string;

  value?: string;

  setValue?: (value: string) => void;
  onChange?: React.ChangeEventHandler;

  type?: TextInputTypes;
  readonly?: boolean;
  name?: string;
  error?: string;
  className?: string;
  children?: React.ReactNode;
};
