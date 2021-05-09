import React from 'react';

import { Story, Meta } from '@storybook/react';

import { PressableIcon } from './PressableIcon.component';
import { PressableIconProps } from './PressableIcon.interface';

export default {
  title: 'molecules/PressableIcon',
  component: PressableIcon,
} as Meta;

const Template: Story<PressableIconProps> = (props) => <PressableIcon {...props} />;

export const Default = Template.bind({});
Default.args = {
  icon: 'generate',
};
