import React from 'react';
import { useGate, useStore } from 'effector-react';

import { useSearchParams } from 'lib/searchParams';

import { Button } from 'components/molecules/Button';
import { TextInput } from 'components/molecules/TextInput';

import { $link, $password, changePassword, copyLinkToClipboardFx, queryParamsGate } from './encrypt.model';

import s from './Encrypt.module.scss';

export const EncryptPage = (): JSX.Element => {
  const searchParams = useSearchParams();
  useGate(queryParamsGate, { id: searchParams.get<string>('id'), public_key: searchParams.get<string>('public_key') });

  const password = useStore($password);
  const link = useStore($link);

  return (
    <main className={s.container}>
      <TextInput placeholder="Type your password..." value={password} setValue={changePassword} />

      <div className={s.link}>
        <TextInput placeholder="Here will be the link" value={link} readonly />
        <Button text="Copy" onClick={copyLinkToClipboardFx as () => void} disabled={link.length === 0} />
      </div>
    </main>
  );
};
