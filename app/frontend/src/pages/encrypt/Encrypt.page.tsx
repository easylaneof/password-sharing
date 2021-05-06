import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'lib/searchParams';
import { post } from 'lib/api';

import { EncryptionParams, EncryptionResponse } from 'types';

import { Button } from 'components/molecules/Button';
import { TextInput } from 'components/molecules/TextInput';

import s from './Encrypt.module.scss';

export const EncryptPage = (): JSX.Element => {
  const [password, setPassword] = useState('');
  const [link, setLink] = useState('');

  const searchParams = useSearchParams();
  const id = searchParams.get<string>('id');

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    setLink('');
  };

  const handleLinkGeneration = async (newPassword: string) => {
    if (id) {
      const response = await post<EncryptionResponse, EncryptionParams>('/encrypt', { id, password: newPassword });
      if (response.message === 'OK') {
        const { id, secret } = response as { id: string; secret: string };
        setLink(`localhost:3000/decrypt?id=${id}&secret=${secret}`);
      }
    }
  };

  const handleCopyToClipboard = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(link);
    }
  };

  useEffect(() => {
    if (password !== '') {
      handleLinkGeneration(password);
    }
  }, [password]);

  return (
    <main className={s.container}>
      <TextInput placeholder="Type your password..." value={password} setValue={handlePasswordChange} />

      <div className={s.link}>
        <TextInput placeholder="Here will be the link" value={link} readonly />
        <Button text="Copy" onClick={handleCopyToClipboard} disabled={link.length === 0} />
      </div>
    </main>
  );
};
