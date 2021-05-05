import React, { useState } from 'react';

import { Story, Meta } from '@storybook/react';

import { TextInput } from './TextInput.component';
import { TextInputProps } from './TextInput.interface';

export default {
  title: 'molecules/TextInput',
  component: TextInput,
} as Meta;

const Template: Story<Omit<TextInputProps, 'setValue'>> = (props) => {
  const [value, setValue] = useState(props.value);

  return <TextInput {...props} value={value} setValue={setValue} />;
};

export const Default = Template.bind({});
Default.args = {};
