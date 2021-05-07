import random
import string
import unittest

from application.encryption.aes_encryption import AESEncryption


class MyTestCase(unittest.TestCase):
    def test_encryption(self):
        random_password = ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))
        cipher = AESEncryption()
        encrypted_password = cipher.encrypt(random_password.encode())
        decrypted_password = cipher.decrypt(encrypted_password).decode()
        self.assertEqual(random_password, decrypted_password)


if __name__ == '__main__':
    unittest.main()
