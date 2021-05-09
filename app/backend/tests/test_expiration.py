import random
import string
from freezegun import freeze_time
from datetime import datetime, timedelta
from flask import url_for

random_string = ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))


def test_expiration(testapp, mock_encryption_env_vars):
    @freeze_time(lambda: datetime.utcnow() + timedelta(hours=1))
    def decrypt():
        testapp.post_json(url_for("general_bp.decrypt"), dict(id=gid,
                                                              secret=encrypted["secret"]), )

    @freeze_time(lambda: datetime.utcnow() + timedelta(hours=2))
    def try_decrypt():
        testapp.post_json(url_for("general_bp.decrypt"), dict(id=gid,
                                                              secret=encrypted["secret"]),
                          status=400)

    generated_res = testapp.get(url_for("general_bp.generate")).json
    gid = generated_res["id"]

    encrypted = testapp.post_json(url_for("general_bp.encrypt"), dict(id=gid,
                                                                      password=random_string,
                                                                      expiry_hours=1,
                                                                      expiry_minutes=59)).json
    decrypt()
    try_decrypt()
