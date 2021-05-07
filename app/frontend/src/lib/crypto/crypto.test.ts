import { decrypt, encrypt, getKeyPair } from './crypto';

describe('Crypto module', () => {
  it('encrypts and decrypts password correctly', async () => {
    const password = 'My awesome password';

    const keys = await getKeyPair();

    const encrypted = encrypt(keys.publicKey, password);
    console.log(encrypted);
    const decrypted = decrypt(keys.privateKey, encrypted);

    expect(decrypted).toBe(password);
  });

  it('fails on decrypting with incorrect private key', async () => {
    const password = 'My awesome password';

    const keys = await getKeyPair();

    const encrypted = encrypt(keys.publicKey, password);

    expect(() => decrypt('', encrypted)).toThrow();
  });
});
