import { attach, createEffect, createStore } from 'effector';

import { writeToClipboard } from 'lib/clipboard';

import { Environment } from 'modules/Environment';

import { GenerationResponse } from './generate.types';
import { generateLink } from './generate.api';

export const $link = createStore('');
export const $isClientOnly = createStore(false);

export const generateLinkFx = createEffect<never, GenerationResponse, { message: string }>();
generateLinkFx.use(async () => {
  let data: GenerationResponse;

  try {
    data = await generateLink();
  } catch (e) {
    throw { message: 'Something went wrong' };
  }

  if (data.message !== 'OK') {
    throw { message: data.message };
  }

  return data;
});

export const copyLinkToClipboardFx = attach({
  effect: createEffect({
    handler: async (link: string) => {
      await writeToClipboard(link);
    },
  }),
  source: $link,
});

export const $linkLoading = generateLinkFx.pending;
export const $linkError = generateLinkFx.failData.map((d) => d.message);

$link.on(generateLinkFx.doneData, (_, { id }) => {
  return `${Environment.hostname}/encrypt?id=${id}`;
});
