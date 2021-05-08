import React, { useEffect, useState } from 'react';

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
Default.args = {
  placeholder: 'Placeholder',
  label: 'Label',
  value: '',
};

const ErrorTemplate: Story<TextInputProps> = (props) => {
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setInterval(() => {
      setError('Error!!!');
    }, 4000);

    setTimeout(() => {
      setInterval(() => {
        setError(undefined);
      }, 4000);
    }, 1000);
  }, []);

  return <TextInput {...props} error={error} />;
};

export const Error = ErrorTemplate.bind({});
Error.args = {
  label: 'I am a error text input',
  placeholder: 'I am a error placeholder',
};
