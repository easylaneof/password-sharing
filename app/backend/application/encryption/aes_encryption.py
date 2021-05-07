from Crypto.Cipher import AES

from application.config import Config


class AESEncryption:
    def __init__(self):
        self.key = Config.ENCRYPTION_KEY.encode()
        self.iv = Config.ENCRYPTION_IV.encode()

    def encrypt(self, message: bytes):
        cipher = AES.new(self.key, AES.MODE_CFB, self.iv)
        return cipher.encrypt(message)

    def decrypt(self, ciphertext: bytes):
        cipher = AES.new(self.key, AES.MODE_CFB, self.iv)
        return cipher.decrypt(ciphertext)
