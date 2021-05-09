import React, { useState } from 'react';

import { Story, Meta } from '@storybook/react';

import { Checkbox } from './Checkbox.component';
import { CheckboxProps } from './Checkbox.interface';

export default {
  title: 'molecules/Checkbox',
  component: Checkbox,
} as Meta;

const Template: Story<CheckboxProps> = ({ checked: _checked, ...props }) => {
  const [checked, setChecked] = useState(_checked);
  return <Checkbox {...props} checked={checked} setChecked={setChecked} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Im label',
};
