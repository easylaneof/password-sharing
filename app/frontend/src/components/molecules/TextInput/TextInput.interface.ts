import React from 'react';

export type TextInputProps = {
  value: string;

  setValue?: (value: string) => void;
  onChange?: React.ChangeEventHandler;

  readonly?: boolean;
  name?: string;
  className?: string;
  placeholder?: string;
  children?: React.ReactNode;
};
