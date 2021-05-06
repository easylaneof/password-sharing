import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'lib/searchParams';
import { post } from 'lib/api';

import { DecryptParams, DecryptResponse } from 'types';

import { TextInput } from 'components/molecules/TextInput';
import { Button } from 'components/molecules/Button';

import s from './Decrypt.module.scss';

export const DecryptPage = (): JSX.Element => {
  const [password, setPassword] = useState('');
  const searchParams = useSearchParams();
  const secret = searchParams.get<string>('secret');
  const id = searchParams.get<string>('id');

  const handleCopyToClipboard = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(password);
    }
  };

  useEffect(() => {
    (async () => {
      if (id && secret) {
        const { password, message } = await post<DecryptResponse, DecryptParams>('/decrypt', { id, secret });
        if (message === 'OK') {
          setPassword(password);
        }
      }
    })();
  }, [id, secret]);

  return (
    <main className={s.container}>
      <div className={s.password}>
        <TextInput placeholder="Here will be the password" value={password} readonly />
        <Button text="Copy" onClick={handleCopyToClipboard} disabled={password.length === 0} />
      </div>
    </main>
  );
};
