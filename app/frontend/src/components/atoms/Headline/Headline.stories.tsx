import React from 'react';

import { Story, Meta } from '@storybook/react';

import { Headline } from './Headline.component';
import { HeadlineProps } from './Headline.interface';

export default {
  title: 'atoms/Headline',
  component: Headline,
} as Meta;

const Template: Story<HeadlineProps> = (props) => <Headline {...props} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Я заголовок',
};
