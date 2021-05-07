import { attach, combine, createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';
import { DecryptResponse } from './decrypt.types';
import { postDecrypt } from './decrypt.api';
import { writeToClipboard } from '../../lib/clipboard';
import { $link } from '../encrypt/encrypt.model';

export const $password = createStore('');

type QueryParamsType = {
  secret: string | null;
  public_key: string | null;
  id: string | null;
};

export const queryParamsGate = createGate<QueryParamsType>();

export const copyPasswordToClipboardFx = attach({
  effect: createEffect({
    handler: async (password: string) => {
      await writeToClipboard(password);
    },
  }),
  source: $password,
});

export const fetchPasswordFx = attach({
  source: queryParamsGate.state,
  effect: createEffect({
    handler: async (params: QueryParamsType) => {
      if (!params.id || !params.secret) {
        throw { message: 'Invalid link' };
      }

      let data: DecryptResponse;

      try {
        data = await postDecrypt({ secret: params.secret, id: params.id });
      } catch (e) {
        throw { message: 'Something went wrong' };
      }

      if (data.message != 'OK') {
        throw { message: data.message };
      }

      return data.password;
    },
  }),
});

export const $passwordLoading = fetchPasswordFx.pending;
export const $passwordError = fetchPasswordFx.failData.map((d) => d.message);
