import { attach, createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';

import { writeToClipboard } from 'lib/clipboard';
import { decrypt } from 'lib/crypto';

import { DecryptResponse } from './decrypt.types';
import { postDecrypt } from './decrypt.api';
import { toast } from '../../lib/toast';

export const $password = createStore('');

type QueryParamsType = {
  secret: string | null;
  publicKey: string | null;
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
        throw new Error('Invalid link');
      }

      if (params.publicKey) {
        const { id, secret } = params;
        const secretWithReplacedSpaces = secret.split(' ').join('+');
        const keys: Record<string, { privateKey: string }> = JSON.parse(localStorage.getItem('keys') ?? '{}');
        const currentKeys = keys[id];

        if (!currentKeys) {
          throw new Error('Invalid link');
        }

        return decrypt(currentKeys.privateKey, secretWithReplacedSpaces);
      }

      let data: DecryptResponse;

      try {
        data = await postDecrypt({ secret: params.secret, id: params.id });
      } catch (e) {
        throw new Error('Something went wrong');
      }

      if (data.message !== 'OK') {
        throw new Error(data.message);
      }

      return data.password;
    },
  }),
});

export const $passwordLoading = fetchPasswordFx.pending;

fetchPasswordFx.failData.watch(({ message }) => {
  toast.error(message);
});

$password.on(fetchPasswordFx.doneData, (_, v) => v);
