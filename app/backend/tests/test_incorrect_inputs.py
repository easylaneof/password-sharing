import random
import string

from flask import url_for

random_string = ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))


def test_key_errors(testapp, mock_encryption_env_vars):
    def check_message(res, key):
        assert res["message"] == f"Key Error: {key}"

    check_message(testapp.post_json(url_for("general_bp.encrypt"), dict(id=random_string),
                                    status=400).json, "password")
    check_message(testapp.post_json(url_for("general_bp.encrypt"), dict(password=random_string),
                                    status=400).json, "id")
    check_message(testapp.post_json(url_for("general_bp.decrypt"), dict(id=random_string),
                                    status=400).json, "secret")
    check_message(testapp.post_json(url_for("general_bp.decrypt"), dict(secret=random_string),
                                    status=400).json, "id")


def test_non_existing_id(testapp, mock_encryption_env_vars):
    def check_message(res):
        assert res["message"] == "Incorrect ID"

        check_message(testapp.post_json(url_for("general_bp.encrypt"), dict(id=random_string,
                                                                            password=random_string),
                                        status=400).json)
        check_message(testapp.post_json(url_for("general_bp.decrypt"), dict(id=random_string,
                                                                            secret=random_string),
                                        status=400).json)


def test_usage_count_and_expiry_time(testapp, mock_encryption_env_vars):
    generated_res = testapp.get(url_for("general_bp.generate")).json
    gid = generated_res["id"]

    imh = testapp.post_json(url_for("general_bp.encrypt"), dict(id=gid,
                                                                password=random_string,
                                                                expiry_hours=-1),
                            status=400).json
    assert imh["message"] == "Incorrect expiry time"

    imm = testapp.post_json(url_for("general_bp.encrypt"), dict(id=gid,
                                                                password=random_string,
                                                                expiry_minutes=-1),
                            status=400).json
    assert imm["message"] == "Incorrect expiry time"

    for negative_zero in range(-1, 1):
        iuc = testapp.post_json(url_for("general_bp.encrypt"), dict(id=gid,
                                                                    password=random_string,
                                                                    max_uses=negative_zero),
                                status=400).json
        assert iuc["message"] == "Incorrect usage count"


def test_incorrect_secret(testapp, mock_encryption_env_vars):
    generated_res = testapp.get(url_for("general_bp.generate")).json
    gid = generated_res["id"]

    dec = testapp.post_json(url_for("general_bp.decrypt"), dict(id=gid,
                                                                secret=random_string),
                            status=400).json
    assert dec["message"] == "Incorrect secret"
