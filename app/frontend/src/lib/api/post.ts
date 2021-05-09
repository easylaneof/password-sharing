import { instance } from './axios';

export const post = <R, B>(url: string, body: B): Promise<R> =>
  instance
    .post(url, body)
    .then((r) => r.data)
    .catch((e) => {
      return e.response.data;
    });
