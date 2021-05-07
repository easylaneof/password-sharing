import React, { useEffect } from 'react';
import { useGate, useStore } from 'effector-react';

import { useSearchParams } from 'lib/searchParams';

import { TextInput } from 'components/molecules/TextInput';
import { Button } from 'components/molecules/Button';

import {
  $password,
  fetchPasswordFx,
  queryParamsGate,
  copyPasswordToClipboardFx,
  $passwordLoading,
} from './decrypt.model';

import s from './Decrypt.module.scss';

export const DecryptPage = (): JSX.Element => {
  const password = useStore($password);
  const passwordLoading = useStore($passwordLoading);

  const searchParams = useSearchParams();
  useGate(queryParamsGate, {
    public_key: searchParams.get<string>('public_key'),
    id: searchParams.get<string>('id'),
    secret: searchParams.get<string>('secret'),
  });

  useEffect(() => {
    fetchPasswordFx();
  }, []);

  return (
    <main className={s.container}>
      <div className={s.password}>
        <TextInput placeholder="Here will be the password" value={password} readonly />
        <Button text="Copy" onClick={copyPasswordToClipboardFx as () => void} disabled={passwordLoading} />
      </div>
    </main>
  );
};
