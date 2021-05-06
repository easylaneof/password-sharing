import { instance } from './axios';

export const get = <R>(url: string): Promise<R> => instance.get(url).then((res) => res.data);
