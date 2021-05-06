import React from 'react';
import { screen, render } from '@testing-library/react';

import { Text } from './Text.component';

describe('Text', () => {
  it('renders given text', () => {
    const text = 'Testing text';
    render(<Text text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
