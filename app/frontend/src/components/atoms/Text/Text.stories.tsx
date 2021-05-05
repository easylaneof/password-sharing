import React from 'react';

import { Story, Meta } from '@storybook/react';

import { Text } from './Text.component';
import { TextProps } from './Text.interface';

export default {
  title: 'atoms/Text',
  component: Text,
} as Meta;

const Template: Story<TextProps> = (props) => <Text {...props} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Я текст',
};
