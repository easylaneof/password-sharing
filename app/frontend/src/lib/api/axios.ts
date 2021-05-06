import axios from 'axios';

import { Environment } from 'modules/Environment';

export const instance = axios.create({
  baseURL: `${Environment.backendUrl}`,
});
