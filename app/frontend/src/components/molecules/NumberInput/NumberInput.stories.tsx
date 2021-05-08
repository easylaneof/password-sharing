import React, { useState } from 'react';

import { Story, Meta } from '@storybook/react';

import { NumberInput } from './NumberInput.component';
import { NumberInputProps } from './NumberInput.interface';

export default {
  title: 'molecules/NumberInput',
  component: NumberInput,
} as Meta;

const Template: Story<NumberInputProps> = ({ value: _value, ...props }) => {
  const [value, setValue] = useState(_value);

  return <NumberInput value={value} {...props} setValue={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Label',
  max: 100,
};
