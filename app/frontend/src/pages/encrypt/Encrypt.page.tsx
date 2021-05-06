import React, { useState } from 'react';

import { Button } from 'components/molecules/Button';
import { TextInput } from 'components/molecules/TextInput';

import s from './Encrypt.module.scss';

export const EncryptPage = (): JSX.Element => {
  const [password, setPassword] = useState('');
  const [link, setLink] = useState('');

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    setLink('');
  };

  const handleLinkGeneration = () => {
    setLink(Math.random().toString());
  };

  const handleCopyToClipboard = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(link);
    }
  };

  return (
    <main className={s.container}>
      <TextInput value={password} setValue={handlePasswordChange} />

      <div className={s.link}>
        <TextInput value={link} readonly />
        <Button onClick={handleLinkGeneration} text="Generate" disabled={password.length === 0} />
      </div>

      <Button text="Copy" onClick={handleCopyToClipboard} disabled={link.length === 0} />
    </main>
  );
};
