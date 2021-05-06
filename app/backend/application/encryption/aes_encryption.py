from Crypto.Cipher import AES
from flask import current_app as app


class AESEncryption:
    key = app.config["ENCRYPTION_KEY"].encode()
    iv = app.config["ENCRYPTION_IV"].encode()

    def encrypt(self, message: bytes):
        cipher = AES.new(self.key, AES.MODE_CFB, self.iv)
        return cipher.encrypt(message)

    def decrypt(self, ciphertext: bytes):
        cipher = AES.new(self.key, AES.MODE_CFB, self.iv)
        return cipher.decrypt(ciphertext)
