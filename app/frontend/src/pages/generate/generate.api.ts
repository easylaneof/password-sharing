import { get } from 'lib/api';

import { GenerationResponse } from './generate.types';

export const generateLink = () => get<GenerationResponse>('/generate');
