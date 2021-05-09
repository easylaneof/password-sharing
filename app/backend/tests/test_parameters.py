import random
import string
from flask import url_for


def test_functionality(testapp, mock_encryption_env_vars):
    def decrypt():
        decrypted_res = testapp.post_json(url_for("general_bp.decrypt"), dict(id=gid,
                                                                              secret=encrypted_json["secret"]))
        assert decrypted_res.status_code == 200

    random_password = ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))
    generated_res = testapp.get(url_for("general_bp.generate"))
    assert generated_res.status_code == 200
    generated_json = generated_res.json
    gid = generated_json["id"]

    encrypted_json = testapp.post_json(url_for("general_bp.encrypt"), dict(id=gid,
                                                                          password=random_password,
                                                                          expiry_hours=random.randrange(0, 11),
                                                                          expiry_minutes=random.randrange(0, 11),
                                                                          max_uses=2)).json

    decrypt()
    decrypt()
    max_used_response = testapp.post_json(url_for("general_bp.decrypt"), dict(id=gid,
                                                                             secret=encrypted_json["secret"]),
                                          status=400)
    assert max_used_response.status_code == 400
    max_used_response_json = max_used_response.json
    assert max_used_response_json["message"] == "Incorrect ID or the link has expired"
