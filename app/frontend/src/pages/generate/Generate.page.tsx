import React, { useEffect } from 'react';

import cx from 'classnames';
import { useGate, useStore } from 'effector-react';
import { motion, Variants } from 'framer-motion';
import { useForm } from 'react-hook-form';

import { validateEmail } from 'lib/vaidation';

import { Text } from 'components/atoms/Text';
import { Headline } from 'components/atoms/Headline';
import { TextInput } from 'components/molecules/TextInput';
import { Button } from 'components/molecules/Button';
import { Checkbox } from 'components/molecules/Checkbox';
import { PressableIcon } from 'components/molecules/PressableIcon';

import {
  $isClientOnly,
  $link,
  copyLinkToClipboardFx,
  generateLinkFx,
  setIsClientOnly,
  $linkLoading,
  GeneratePageGate,
} from './generate.model';

import s from './Generate.module.scss';

const appearVariants: Variants = {
  appear: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  initial: {
    opacity: 0,
    transition: {
      duration: 0,
    },
  },
};

export const GeneratePage = () => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({ shouldFocusError: true });

  useGate(GeneratePageGate, { email: watch('email') });

  const link = useStore($link);
  const isClientOnly = useStore($isClientOnly);
  const linkLoading = useStore($linkLoading);

  const handleEmailSend = handleSubmit(console.log);

  useEffect(() => {
    generateLinkFx(null as never);
  }, []);

  return (
    <main className={cx(s.container, 'page')}>
      <Headline type="h1" text="Generate Keypair" className={s.headline} />

      <Text
        className={s.description}
        text="Send the URL below to the person who knows the password and then follow the link they send in return. It's important that no one can change this first link in transit and the sharer gets it exactly as generated. The link is not secret - it's OK to make it even public, it just should be the original one. "
      />

      <Text
        className={s.description}
        text={
          'There are 2 options: you can choose "Client only" mode, meaning that the keys will be generated at your browser, or you can generate them on server, which allows the person who knows the password to set the expiration time and maximal usages of the link with the password'
        }
      />

      <div className={s.content}>
        <TextInput placeholder="URL" label="URL to share" value={link} readonly>
          <PressableIcon icon="generate" onClick={generateLinkFx as () => void} disabled={linkLoading} />
          <PressableIcon icon="share" onClick={console.log} />
          <Button
            onClick={copyLinkToClipboardFx as () => void}
            text="Copy"
            loading={linkLoading}
            className={s.button}
          />
        </TextInput>
      </div>

      <Checkbox className={s.clientOnly} checked={isClientOnly} setChecked={setIsClientOnly} label="Client only" />

      <div className={cx(s.shareContainer, isClientOnly && s.hidden)}>
        <motion.div
          variants={appearVariants}
          initial="initial"
          animate={isClientOnly ? 'initial' : 'appear'}
          className={s.share}
        >
          <TextInput
            error={errors.email?.message}
            {...register('email', { required: true, validate: validateEmail })}
            defaultValue=""
            placeholder="Email"
            label="Email"
          >
            <Button onClick={handleEmailSend} text="Send" disabled={Boolean(errors.email?.message)} />
          </TextInput>
        </motion.div>
      </div>
    </main>
  );
};
