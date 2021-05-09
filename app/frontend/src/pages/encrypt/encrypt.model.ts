import { attach, createEffect, createEvent, createStore, combine, restore, Store } from 'effector';
import { createGate } from 'effector-react';

import { writeToClipboard } from 'lib/clipboard';
import { encrypt } from 'lib/crypto';
import { toast } from 'lib/toast';
import { validateAscii } from 'lib/vaidation';

import { Environment } from 'modules/Environment';

import { EncryptionResponse } from './encrypt.types';
import { postEncrypt } from './encrypt.api';

export const $link = createStore('');

export const setExpiryHours = createEvent<string>();
export const $expiryHours = restore(setExpiryHours, '1');
export const setExpiryMinutes = createEvent<string>();
export const $expiryMinutes = restore(setExpiryMinutes, '00');
export const setMaxUses = createEvent<number>();
export const $maxUses = restore(setMaxUses, 1);

type EncryptPageGateProps = {
  id: string | null;
  publicKey: string | null;
  password: string;
};

export const EncryptPageGate = createGate<EncryptPageGateProps>();

const $password = EncryptPageGate.state.map((s) => s.password ?? '');

export const $isClient = EncryptPageGate.state.map((s) => Boolean(s.publicKey));

export const generateLinkFx = attach({
  source: combine({
    password: $password,
    gate: EncryptPageGate.state,
    maxUses: $maxUses,
    expiryHours: $expiryHours,
    expiryMinutes: $expiryMinutes,
  }),
  effect: createEffect({
    handler: async ({
      password,
      gate,
      maxUses,
      expiryMinutes,
      expiryHours,
    }: {
      password: string;
      gate: EncryptPageGateProps;
      maxUses: number;
      expiryHours: string;
      expiryMinutes: string;
    }) => {
      if (password.length === 0 || validateAscii(password) !== true) {
        return '';
      }

      if (!gate.id) {
        throw new Error('Invalid link');
      }

      if (gate.publicKey) {
        const { publicKey, id } = gate;
        const publicKeyWithPluses = publicKey.split(' ').join('+');

        const secret = await encrypt(publicKeyWithPluses, password);

        return `${Environment.hostname}/decrypt?id=${id}&secret=${secret}&publicKey=${publicKeyWithPluses}`;
      }

      let data: EncryptionResponse;

      try {
        data = await postEncrypt({
          password,
          id: gate.id,
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

generateLinkFx.failData.watch((e) => {
  toast.error(e.message);
});

$link.on($password, () => '').on(generateLinkFx.doneData, (_, v) => v);

// for some reason doesn't allow to make such loop without assigning
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _ = ([$password, $expiryMinutes, $expiryHours, $maxUses] as Store<unknown>[]).forEach((store) =>
  store.watch(() => generateLinkFx())
);
