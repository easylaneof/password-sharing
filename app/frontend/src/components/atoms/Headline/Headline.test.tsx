import React from 'react';
import { screen, render } from '@testing-library/react';

import { Headline } from './Headline.component';
import { HeadlineTypes } from './Headline.interface';

describe('Headline', () => {
  it('renders given text', () => {
    const text = 'Testing text';

    render(<Headline text={text} />);

    const headline = screen.getByRole('heading');

    expect(headline).toHaveTextContent(text);
  });

  it.each([1, 2])('renders heading with level %i', (level) => {
    render(<Headline text="" type={`h${level}` as HeadlineTypes} />);

    expect(screen.getByRole('heading', { level })).toBeInTheDocument();
  });
});
