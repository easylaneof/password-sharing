import { post } from 'lib/api';

import { DecryptParams, DecryptResponse } from './decrypt.types';

export const postDecrypt = (p: DecryptParams) => post<DecryptResponse, DecryptParams>('/decrypt', p);
