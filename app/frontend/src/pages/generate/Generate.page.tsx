import React, { useEffect } from 'react';

import cx from 'classnames';
import { useStore } from 'effector-react';
import { motion, Variants } from 'framer-motion';

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
  $email,
  setEmail,
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
  const link = useStore($link);
  const isClientOnly = useStore($isClientOnly);
  const linkLoading = useStore($linkLoading);
  const email = useStore($email);

  useEffect(() => {
    generateLinkFx(null as never);
  }, []);

  return (
    <main className={cx(s.container, 'page')}>
      <Headline type="h1" text="Lorem ipsum dolor sit amet, consectetur adipisicing elit." className={s.headline} />

      <Text
        className={s.description}
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas tortor, tincidunt urna augue cras libero, morbi. Massa neque facilisis nulla blandit donec semper. Vestibulum, lectus ipsum justo, integer. Elementum vivamus quisque mi ut faucibus magna odio felis. Dui feugiat facilisis elit commodo lobortis sagittis purus.
Elementum vivamus quisque mi ut faucibus magna odio felis. Dui feugiat facilisis elit commodo lobortis sagittis purus. "
      />

      <div className={s.content}>
        <TextInput placeholder="URL" label="URL to share" value={link} readonly>
          <PressableIcon icon="generate" onClick={generateLinkFx as () => void} disabled={linkLoading} />
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
          <TextInput placeholder="Email" label="Email" value={email} setValue={setEmail}>
            <PressableIcon icon="share" onClick={generateLinkFx as () => void} disabled={linkLoading} />
            <Button onClick={copyLinkToClipboardFx as () => void} text="Send" />
          </TextInput>
        </motion.div>
      </div>
    </main>
  );
};
