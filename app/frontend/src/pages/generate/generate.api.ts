import { get, post } from 'lib/api';

import { GenerationResponse, SendMailParams, SendMailResult } from './generate.types';

export const generateLink = () => get<GenerationResponse>('/generate');

export const sendEmail = (p: SendMailParams) => post<SendMailResult, SendMailParams>('/send_email', p);
