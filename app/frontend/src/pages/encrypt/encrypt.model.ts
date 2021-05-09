import { attach, createEffect, createEvent, createStore, combine, restore } from 'effector';
import { createGate } from 'effector-react';

import { writeToClipboard } from 'lib/clipboard';
import { encrypt } from 'lib/crypto';

import { Environment } from 'modules/Environment';

import { EncryptionResponse } from './encrypt.types';
import { postEncrypt } from './encrypt.api';
import { toast } from '../../lib/toast';

export const $password = createStore('');
export const $link = createStore('');

export const setExpiryHours = createEvent<string>();
export const $expiryHours = restore(setExpiryHours, '1');
export const setExpiryMinutes = createEvent<string>();
export const $expiryMinutes = restore(setExpiryMinutes, '00');
export const setMaxUses = createEvent<number>();
export const $maxUses = restore(setMaxUses, 1);

type QueryParamsType = {
  id: string | null;
  publicKey: string | null;
};

export const queryParamsGate = createGate<QueryParamsType>();

export const $isClient = queryParamsGate.state.map((s) => Boolean(s.publicKey));

export const changePassword = createEvent<string>();

export const generateLinkFx = attach({
  source: combine({
    password: $password,
    queryParams: queryParamsGate.state,
    maxUses: $maxUses,
    expiryHours: $expiryHours,
    expiryMinutes: $expiryMinutes,
  }),
  effect: createEffect({
    handler: async ({
      password,
      queryParams,
      maxUses,
      expiryMinutes,
      expiryHours,
    }: {
      password: string;
      queryParams: QueryParamsType;
      maxUses: number;
      expiryHours: string;
      expiryMinutes: string;
    }) => {
      if (password.length === 0) {
        return '';
      }

      if (!queryParams.id) {
        throw new Error('Invalid link');
      }

      if (queryParams.publicKey) {
        const { publicKey, id } = queryParams;
        const publicKeyWithPluses = publicKey.split(' ').join('+');

        const secret = await encrypt(publicKeyWithPluses, password);

        return `${Environment.hostname}/decrypt?id=${id}&secret=${secret}&publicKey=${publicKeyWithPluses}`;
      }

      let data: EncryptionResponse;

      try {
        data = await postEncrypt({
          password,
          id: queryParams.id,
          expiry_hours: Number(expiryHours),
          expiry_minutes: Number(expiryMinutes),
          max_uses: maxUses,
        });
      } catch (e) {
        throw new Error('Something went wrong');
      }

      if (data.message !== 'OK') {
        throw new Error(data.message);
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

generateLinkFx.failData.watch(({ message }) => {
  toast.error(message);
});

$password.on(changePassword, (_, p) => p);
$link.on(changePassword, () => '').on(generateLinkFx.doneData, (_, v) => v);

$password.watch(() => {
  generateLinkFx();
});
