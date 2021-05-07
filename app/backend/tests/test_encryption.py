import random
import string
from unittest.mock import patch

import application
from application.encryption.aes_encryption import AESEncryption


class TestEncryption:

    def test_encryption(self):
        with patch.object(application.encryption.aes_encryption.AESEncryption, 'key', 'blahblah') as mock_patch:
            mock_patch.return_value.config.return_value = {
                {"ENCRYPTION_KEY": ''.join(random.choices(string.ascii_uppercase + string.digits, k=32)),
                 "ENCRYPTION_IV": ''.join(random.choices(string.ascii_uppercase + string.digits, k=16))}}
            random_password = ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))
            cipher = AESEncryption()
            encrypted_password = cipher.encrypt(random_password.encode())
            decrypted_password = cipher.decrypt(encrypted_password).decode()
            self.assertEqual(random_password, decrypted_password)
