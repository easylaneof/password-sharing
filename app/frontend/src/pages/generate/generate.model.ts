import { attach, createEffect, createEvent, createStore, restore, Store } from 'effector';

import { v4 as uuid } from 'uuid';

import { getKeyPair } from 'lib/crypto';
import { writeToClipboard } from 'lib/clipboard';

import { Environment } from 'modules/Environment';

import { GenerationResponse } from './generate.types';
import { generateLink } from './generate.api';

export const $link = createStore('');

export const setEmail = createEvent<string>();
export const $email = restore(setEmail, '');

export const setIsClientOnly = createEvent<boolean>();
export const $isClientOnly = restore(setIsClientOnly, true);

export const generateLinkFx = attach({
  source: $isClientOnly,
  effect: createEffect({
    handler: async (isClientOnly: boolean) => {
      if (isClientOnly) {
        const id = uuid();
        const keys = await getKeyPair();

        const prevKeys = JSON.parse(localStorage.getItem('keys') ?? '{}');
        prevKeys[id] = keys;
        localStorage.setItem('keys', JSON.stringify(prevKeys));

        return `${Environment.hostname}/encrypt?id=${id}&publicKey=${keys.publicKey}`;
      }

      let data: GenerationResponse;

      try {
        data = await generateLink();
      } catch (e) {
        throw { message: 'Something went wrong' };
      }

      if (data.message !== 'OK') {
        throw { message: data.message };
      }

      return `${Environment.hostname}/encrypt?id=${data.id}`;
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
export const $linkError: Store<string | null> = restore(
  generateLinkFx.failData.map((d) => d.message),
  null
);

$isClientOnly.watch(() => generateLinkFx());

$link.on(generateLinkFx.doneData, (_, v) => v);
