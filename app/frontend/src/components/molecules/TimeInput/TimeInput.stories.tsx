import React, { useState } from 'react';

import { Story, Meta } from '@storybook/react';

import { TimeInput } from './TimeInput.component';
import { TimeInputProps } from './TimeInput.interface';

export default {
  title: 'molecules/TimeInput',
  component: TimeInput,
} as Meta;

const Template: Story<TimeInputProps> = ({ minutes: _minutes, hours: _hours, ...props }) => {
  const [hours, setHours] = useState(_hours);
  const [minutes, setMinutes] = useState(_minutes);

  return <TimeInput {...props} hours={hours} minutes={minutes} setHours={setHours} setMinutes={setMinutes} />;
};

export const Default = Template.bind({});
Default.args = {};
