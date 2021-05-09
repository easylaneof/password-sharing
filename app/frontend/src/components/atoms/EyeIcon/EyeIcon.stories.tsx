import React, { useState } from 'react';

import { Story, Meta } from '@storybook/react';

import { EyeIcon } from './EyeIcon.component';
import { EyeIconProps } from './EyeIcon.interface';

export default {
  title: 'atoms/EyeIcon',
  component: EyeIcon,
} as Meta;

const Template: Story<EyeIconProps> = ({ open: _open, ...props }) => {
  const [open, setOpen] = useState(_open);

  return <EyeIcon {...props} open={open} setOpen={setOpen} />;
};

export const Default = Template.bind({});
Default.args = {
  open: false,
};
