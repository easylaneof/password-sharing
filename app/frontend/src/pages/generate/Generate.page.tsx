import React, { useEffect, useRef, useState } from 'react';

import { get } from 'lib/api';

import { GenerationResponse } from 'types';

import { Text } from 'components/atoms/Text';
import { Headline } from 'components/atoms/Headline';
import { TextInput } from 'components/molecules/TextInput';
import { Button } from 'components/molecules/Button';

import s from './Generate.module.scss';

export const GeneratePage = () => {
  const [link, setLink] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleGeneration = async () => {
    const { id } = await get<GenerationResponse>('/generate');
    setLink(`localhost:3000/encrypt?id=${id}`);
  };

  const handleCopyToClipboard = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(link);
    }
  };

  useEffect(() => {
    handleGeneration();
  }, []);

  return (
    <main className={s.container}>
      <Headline text="Lorem ipsum dolor sit amet, consectetur adipisicing elit." className={s.headline} />

      <Text text="Very useful text. Very useful text text useful" />

      <div className={s.content}>
        <TextInput ref={inputRef} value={link} readonly />
        <Button onClick={handleGeneration} text="Generate" />
      </div>

      <Button onClick={handleCopyToClipboard} text="Copy to clipboard" />
    </main>
  );
};
