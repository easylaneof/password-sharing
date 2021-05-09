import React from 'react';

import { Story, Meta } from '@storybook/react';

import { ThemeSwitcher } from './ThemeSwitcher.component';
import { ThemeSwitcherProps } from './ThemeSwitcher.interface';

export default {
  title: 'atoms/ThemeSwitcher',
  component: ThemeSwitcher,
} as Meta;

const Template: Story<ThemeSwitcherProps> = (props) => <ThemeSwitcher {...props} />;

export const Default = Template.bind({});
Default.args = {};
