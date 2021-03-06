import { pki, util } from 'node-forge';

import { addFirstAndLastLine, PemType, removeFirstAndLastLine } from './pem.util';

const rsa = pki.rsa;

export const getKeyPair = () => {
  return new Promise<{ publicKey: string; privateKey: string }>((res, rej) => {
    rsa.generateKeyPair({ bits: 1024, workers: 0 }, (err, keyPair) => {
      if (err) {
        rej(err);
      }

      const { privateKey, publicKey } = keyPair;

      res({
        publicKey: removeFirstAndLastLine(pki.publicKeyToPem(publicKey)),
        privateKey: removeFirstAndLastLine(pki.privateKeyToPem(privateKey)),
      });
    });
  });
};

export const encrypt = (publicKey: string, password: string) => {
  const publicKeyObject = pki.publicKeyFromPem(addFirstAndLastLine(publicKey, PemType.PUBLIC));
  return util.encode64(publicKeyObject.encrypt(password));
};

export const decrypt = (privateKey: string, secret: string) => {
  const privateKeyObject = pki.privateKeyFromPem(addFirstAndLastLine(privateKey, PemType.PRIVATE));
  return privateKeyObject.decrypt(util.decode64(secret));
};
