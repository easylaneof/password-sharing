import random
import string
from unittest.mock import patch

import application
from application.encryption.aes_encryption import AESEncryption


class TestEncryption:
    @patch('application.encryption.aes_encryption.Config')
    def test_encryption(self, mock_patch):
        mock_patch.ENCRYPTION_KEY = ''.join(random.choices(string.ascii_uppercase + string.digits, k=32))
        mock_patch.ENCRYPTION_IV = ''.join(random.choices(string.ascii_uppercase + string.digits, k=16))
        random_password = ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))
        cipher = AESEncryption()
        encrypted_password = cipher.encrypt(random_password.encode())
        decrypted_password = cipher.decrypt(encrypted_password).decode()
        assert random_password == decrypted_password
