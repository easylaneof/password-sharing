import random
import string

import pytest
from flask import url_for


def message_check(message):
    assert message == "OK"


def test_functionality(testapp, mock_encryption_env_vars):
    random_password = ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))
    generated_res = testapp.get(url_for("general_bp.generate"))
    assert generated_res.status_code == 200
    generated_json = generated_res.json

    message_check(generated_json["message"])
    gid = generated_json["id"]

    encrypted_res = testapp.post_json(url_for("general_bp.encrypt"), dict(id=gid,
                                                                          password=random_password))
    assert encrypted_res.status_code == 200
    encrypted_json = encrypted_res.json
    message_check(encrypted_json["message"])
    assert encrypted_json["id"] == gid

    decrypted_res = testapp.post_json(url_for("general_bp.decrypt"), dict(id=gid,
                                                                          secret=encrypted_json["secret"]))
    assert decrypted_res.status_code == 200
    decrypted_json = decrypted_res.json
    message_check(decrypted_json["message"])
    assert decrypted_json["password"] == random_password
