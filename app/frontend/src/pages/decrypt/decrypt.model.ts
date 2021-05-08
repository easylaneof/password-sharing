import { attach, createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';

import { writeToClipboard } from 'lib/clipboard';
import { decrypt } from 'lib/crypto';

import { DecryptResponse } from './decrypt.types';
import { postDecrypt } from './decrypt.api';

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
        throw { message: 'Invalid link' };
      }

      if (params.publicKey) {
        const { id, secret } = params;
        const secretWithReplacedSpaces = secret.split(' ').join('+');
        const keys: Record<string, { privateKey: string }> = JSON.parse(localStorage.getItem('keys') ?? '{}');
        const currentKeys = keys[id];

        if (!currentKeys) {
          throw { message: 'Invalid link' };
        }

        return decrypt(currentKeys.privateKey, secretWithReplacedSpaces);
      }

      let data: DecryptResponse;

      try {
        data = await postDecrypt({ secret: params.secret, id: params.id });
      } catch (e) {
        throw { message: 'Something went wrong' };
      }

      if (data.message !== 'OK') {
        throw { message: data.message };
      }

      return data.password;
    },
  }),
});

export const $passwordLoading = fetchPasswordFx.pending;
export const $passwordError = fetchPasswordFx.failData.map((d) => d.message);

$passwordError.watch(console.log);

$password.on(fetchPasswordFx.doneData, (_, v) => v);
