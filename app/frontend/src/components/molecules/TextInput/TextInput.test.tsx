import React, { useState } from 'react';

import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';

import { TextInput } from './TextInput.component';

const MOCK_TEXT = 'Testing...';

const setValueMock = jest.fn();

const Wrapper = ({ readonly = false }: { readonly?: boolean }) => {
  const [value, setValue] = useState('');

  return (
    <TextInput
      value={value}
      setValue={(v) => {
        setValueMock(v);
        setValue(v);
      }}
      readonly={readonly}
    />
  );
};

describe('TextInput', () => {
  beforeEach(setValueMock.mockClear);

  it('renders text input with correct value', () => {
    render(<TextInput value={MOCK_TEXT} />);

    expect(screen.getByRole('textbox')).toHaveValue(MOCK_TEXT);
  });

  it('correctly sets value', () => {
    render(<Wrapper />);

    userEvent.type(screen.getByRole('textbox'), MOCK_TEXT);

    expect(setValueMock).toHaveBeenLastCalledWith(MOCK_TEXT);
    expect(screen.getByRole('textbox')).toHaveValue(MOCK_TEXT);
  });

  it('does not set value when input is readonly', () => {
    render(<Wrapper readonly />);

    userEvent.type(screen.getByRole('textbox'), MOCK_TEXT);

    expect(setValueMock).not.toBeCalled();
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('sets name and placeholder', () => {
    const placeholder = 'placeholder';
    const name = 'name';

    render(<TextInput value={MOCK_TEXT} placeholder={placeholder} name={name} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveProperty('placeholder', placeholder);
    expect(input).toHaveProperty('name', name);
  });
});
