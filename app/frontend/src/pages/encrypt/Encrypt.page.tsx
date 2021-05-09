import React from 'react';

import cx from 'classnames';
import { useGate, useStore } from 'effector-react';
import { useForm } from 'react-hook-form';

import { useSearchParams } from 'lib/search-params';
import { validateAscii } from 'lib/vaidation';

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
  copyLinkToClipboardFx,
  EncryptPageGate,
  setExpiryHours,
  setExpiryMinutes,
  setMaxUses,
} from './encrypt.model';

import s from './Encrypt.module.scss';

const clientText =
  "Send a password in a secure way. Only the person who have sent you this link will be able to decrypt it. This page does not send anything anywhere. It encrypts the entered password using the recipient's public key encoded in the URL.";
const serverText =
  'Send a password in a secure way. You can choose how long the link to your password will be available, and how many times it will be possible to open it';

export const EncryptPage = (): JSX.Element => {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm({ shouldFocusError: true, mode: 'onBlur' });

  const searchParams = useSearchParams();
  useGate(EncryptPageGate, {
    id: searchParams.get<string>('id'),
    publicKey: searchParams.get<string>('publicKey'),
    password: watch('password') ?? '',
  });

  const link = useStore($link);
  const expiryHours = useStore($expiryHours);
  const expiryMinutes = useStore($expiryMinutes);
  const maxUses = useStore($maxUses);
  const isClient = useStore($isClient);

  const linkLoading = useStore($linkLoading);

  return (
    <main className={cx(s.container, 'page')}>
      <Headline type="h1" text="Encrypt Password" className={s.headline} />

      <Text className={s.description} text={isClient ? clientText : serverText} />

      <form className={s.content} onSubmit={(e) => e.preventDefault()}>
        {/* hack so chrome doesnt show warning about a11y */}
        <input type="text" name="email" value="" autoComplete="email" style={{ display: 'none' }} readOnly />

        <TextInput
          type="password"
          label="Password"
          placeholder="Type your password..."
          defaultValue=""
          {...register('password', { required: true, validate: validateAscii })}
          error={errors.password?.message}
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
      </form>
    </main>
  );
};
