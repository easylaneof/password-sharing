import React from 'react';
import { useGate, useStore } from 'effector-react';
import cx from 'classnames';

import { useSearchParams } from 'lib/search-params';

import { Headline } from 'components/atoms/Headline';
import { Text } from 'components/atoms/Text';
import { Button } from 'components/molecules/Button';
import { TextInput } from 'components/molecules/TextInput';
import { TimeInput } from 'components/molecules/TimeInput';
import { NumberInput } from 'components/molecules/NumberInput';

import {
  $expiryHours,
  $expiryMinutes,
  $isClient,
  $link,
  $linkLoading,
  $maxUses,
  $password,
  changePassword,
  copyLinkToClipboardFx,
  queryParamsGate,
  setExpiryHours,
  setExpiryMinutes,
  setMaxUses,
} from './encrypt.model';

import s from './Encrypt.module.scss';

export const EncryptPage = (): JSX.Element => {
  const searchParams = useSearchParams();
  useGate(queryParamsGate, { id: searchParams.get<string>('id'), publicKey: searchParams.get<string>('publicKey') });

  const password = useStore($password);
  const link = useStore($link);
  const expiryHours = useStore($expiryHours);
  const expiryMinutes = useStore($expiryMinutes);
  const maxUses = useStore($maxUses);
  const isClient = useStore($isClient);

  const linkLoading = useStore($linkLoading);

  return (
    <main className={cx(s.container, 'page')}>
      <Headline type="h1" text="Lorem ipsum dolor sit amet, consectetur adipisicing elit." className={s.headline} />

      <Text
        className={s.description}
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas tortor, tincidunt urna augue cras libero, morbi. Massa neque facilisis nulla blandit donec semper. Vestibulum, lectus ipsum justo, integer. Elementum vivamus quisque mi ut faucibus magna odio felis. Dui feugiat facilisis elit commodo lobortis sagittis purus.
Elementum vivamus quisque mi ut faucibus magna odio felis. Dui feugiat facilisis elit commodo lobortis sagittis purus. "
      />

      <div className={s.content}>
        <TextInput
          type="password"
          label="Password"
          placeholder="Type your password..."
          value={password}
          setValue={changePassword}
        />

        {!isClient && (
          <div className={s.settings}>
            <TimeInput
              hours={expiryHours}
              minutes={expiryMinutes}
              setHours={setExpiryHours}
              setMinutes={setExpiryMinutes}
              label="Expires in"
            />

            <NumberInput value={maxUses} setValue={setMaxUses} max={99} label="Max uses" />
          </div>
        )}

        <TextInput className={s.link} label="Link" placeholder="Here will be the link" value={link} readonly>
          <Button text="Copy" onClick={copyLinkToClipboardFx as () => void} loading={linkLoading} />
        </TextInput>
      </div>
    </main>
  );
};
