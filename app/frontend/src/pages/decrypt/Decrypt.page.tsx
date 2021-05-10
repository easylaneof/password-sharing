import React, { useEffect } from 'react';
import { useGate, useStore } from 'effector-react';

import cx from 'classnames';
import { Link } from 'react-router-dom';

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
    <main className={cx(s.container, 'page')}>
      <Headline type="h1" text="Get Password" className={s.headline} />

      <Text
        className={s.description}
        text="Here is the password that has been shared with you. Make sure to retrieve it now and store it in a safe place (e.g. password manager). Thank you for using our service!"
      />

      <form className={s.content} onSubmit={(e) => e.preventDefault()}>
        {/* hack so chrome doesnt show warning about a11y */}
        <input type="text" name="email" value="" autoComplete="email" style={{ display: 'none' }} readOnly />

        <TextInput type="password" label="Password" placeholder="Here will be the password" value={password} readonly>
          <Button text="Copy" onClick={copyPasswordToClipboardFx as () => void} disabled={passwordLoading} />
        </TextInput>
      </form>

      <Link to="/generate" className={s.link}>
        <Text text="Try again" currentColor />
      </Link>
    </main>
  );
};
