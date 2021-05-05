import React, { useState } from 'react';

import s from './Generate.module.scss';

import { Text } from 'components/atoms/Text';
import { Headline } from 'components/atoms/Headline';
import { TextInput } from 'components/molecules/TextInput';
import { Button } from 'components/molecules/Button';

export const GeneratePage = () => {
  const [link, setLink] = useState(Math.random().toString());

  const handleGeneration = () => {
    setLink(Math.random().toString());
  };

  const handleCopyToClipboard = () => {
    //
  };

  return (
    <main className={s.container}>
      <Headline text="Lorem ipsum dolor sit amet, consectetur adipisicing elit." className={s.headline} />

      <Text text="Very useful text. Very useful text text useful" />

      <div className={s.content}>
        <TextInput value={link} setValue={setLink} readonly />
        <Button onClick={handleGeneration} text="Generate" />
      </div>

      <Button onClick={handleCopyToClipboard} text="Copy to clipboard" />
    </main>
  );
};
