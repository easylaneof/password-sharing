import { post } from 'lib/api';

import { EncryptionParams, EncryptionResponse } from './encrypt.types';

export const postEncrypt = (p: EncryptionParams) => post<EncryptionResponse, EncryptionParams>('/encrypt', p);
