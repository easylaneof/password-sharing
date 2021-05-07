import React, { useEffect, useRef } from 'react';

import { useStore } from 'effector-react';

import { Text } from 'components/atoms/Text';
import { Headline } from 'components/atoms/Headline';
import { TextInput } from 'components/molecules/TextInput';
import { Button } from 'components/molecules/Button';

import { $link, copyLinkToClipboardFx, generateLinkFx } from './generate.model';

import s from './Generate.module.scss';

export const GeneratePage = () => {
  const link = useStore($link);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    generateLinkFx(null as never);
  }, []);

  return (
    <main className={s.container}>
      <Headline text="Lorem ipsum dolor sit amet, consectetur adipisicing elit." className={s.headline} />

      <Text text="Very useful text. Very useful text text useful" />

      <div className={s.content}>
        <TextInput ref={inputRef} value={link} readonly />
        <Button onClick={generateLinkFx} text="Generate" />
      </div>

      <Button onClick={copyLinkToClipboardFx as () => void} text="Copy to clipboard" />
    </main>
  );
};
