import React from 'react';
import { toast as _toast } from 'react-toastify';

import { Text } from 'components/atoms/Text';

export const toast = {
  error(error: string) {
    _toast.error(<Text text={error} color="white" />);
  },
  info(message: string) {
    _toast.info(<Text text={message} color="white" />);
  },
};
