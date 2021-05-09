import React, { useEffect } from 'react';
import { useGate, useStore } from 'effector-react';

import { useSearchParams } from 'lib/search-params';

import { Headline } from 'components/atoms/Headline';
import { Text } from 'components/atoms/Text';
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
    publicKey: searchParams.get<string>('publicKey'),
    id: searchParams.get<string>('id'),
    secret: searchParams.get<string>('secret'),
  });

  useEffect(() => {
    fetchPasswordFx();
  }, []);

  return (
    <main className={s.container}>
      <Headline type="h1" text="Lorem ipsum dolor sit amet, consectetur adipisicing elit." className={s.headline} />

      <Text
        className={s.description}
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas tortor, tincidunt urna augue cras libero, morbi. Massa neque facilisis nulla blandit donec semper. Vestibulum, lectus ipsum justo, integer. Elementum vivamus quisque mi ut faucibus magna odio felis. Dui feugiat facilisis elit commodo lobortis sagittis purus.
Elementum vivamus quisque mi ut faucibus magna odio felis. Dui feugiat facilisis elit commodo lobortis sagittis purus. "
      />

      <div className={s.content}>
        <TextInput type="password" label="Password" placeholder="Here will be the password" value={password} readonly>
          <Button text="Copy" onClick={copyPasswordToClipboardFx as () => void} disabled={passwordLoading} />
        </TextInput>
      </div>
    </main>
  );
};
