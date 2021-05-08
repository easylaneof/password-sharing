import { attach, createEffect, createEvent, createStore, combine } from 'effector';
import { createGate } from 'effector-react';

import { writeToClipboard } from 'lib/clipboard';
import { encrypt } from 'lib/crypto';

import { Environment } from 'modules/Environment';

import { EncryptionResponse } from './encrypt.types';
import { postEncrypt } from './encrypt.api';

export const $password = createStore('');
export const $link = createStore('');

type QueryParamsType = {
  id: string | null;
  publicKey: string | null;
};

export const queryParamsGate = createGate<QueryParamsType>();

export const changePassword = createEvent<string>();

export const generateLinkFx = attach({
  source: combine({ password: $password, queryParams: queryParamsGate.state }),
  effect: createEffect({
    handler: async ({ password, queryParams }: { password: string; queryParams: QueryParamsType }) => {
      if (password.length === 0) {
        return '';
      }

      if (!queryParams.id) {
        throw { message: 'Invalid link' };
      }

      if (queryParams.publicKey) {
        const { publicKey, id } = queryParams;
        const publicKeyWithPluses = publicKey.split(' ').join('+');

        const secret = await encrypt(publicKeyWithPluses, password);

        return `${Environment.hostname}/decrypt?id=${id}&secret=${secret}&publicKey=${publicKeyWithPluses}`;
      }

      let data: EncryptionResponse;

      try {
        data = await postEncrypt({ password, id: queryParams.id });
      } catch (e) {
        throw { message: 'Something went wrong' };
      }

      if (data.message !== 'OK') {
        throw { message: data.message };
      }

      const { id, secret } = data;

      return `${Environment.hostname}/decrypt?id=${id}&secret=${secret}`;
    },
  }),
});

export const copyLinkToClipboardFx = attach({
  effect: createEffect({
    handler: writeToClipboard,
  }),
  source: $link,
});

export const $linkLoading = generateLinkFx.pending;
export const $linkError = generateLinkFx.failData.map((d) => d.message);

$password.on(changePassword, (_, p) => p);
$link.on(changePassword, () => '').on(generateLinkFx.doneData, (_, v) => v);

$password.watch(() => {
  generateLinkFx();
});

$linkError.watch(console.log);
