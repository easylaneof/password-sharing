import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './Button.component';

const MOCK_TEXT = 'Testing...';
const empty = () => {
  //
};

describe('Button', () => {
  it('renders button with correct text', () => {
    render(<Button text={MOCK_TEXT} onClick={empty} />);
    expect(screen.getByRole('button')).toHaveTextContent(MOCK_TEXT);
  });

  it('calls callback when button is clicked', () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick} text={MOCK_TEXT} />);

    const button = screen.getByRole('button');
    userEvent.click(button);

    expect(handleClick).toBeCalledTimes(1);
  });

  it('does not calls callback when disabled button is clicked', () => {
    const handleClick = jest.fn();

    render(<Button text={MOCK_TEXT} onClick={handleClick} disabled />);

    const button = screen.getByRole('button');
    userEvent.click(button);

    expect(handleClick).not.toBeCalled();
  });
});
