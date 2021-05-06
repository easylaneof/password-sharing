import React from 'react';

import { Story, Meta } from '@storybook/react';

import { Button } from './Button.component';
import { ButtonProps } from './Button.interface';

export default {
  title: 'molecules/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (props) => <Button {...props} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Я кнопка',
};
