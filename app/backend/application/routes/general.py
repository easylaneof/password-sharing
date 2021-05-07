import binascii
from flask import current_app as app, request
from application.database import *
from application.utils import generate_id, validator, convert_str_to_int
from application.encryption.app_encryption import *
from application.encryption.aes_encryption import AESEncryption
from application.dbmodels import Sessions


@app.route("/generate", methods=["GET"])
def generate():
    keys = generate_keys()
    new_id = generate_id()
    encrypted_private_key = AESEncryption().encrypt(keys["private"])
    new_record = Sessions(id=new_id,
                          public_key=keys["public"],
                          private_key=encrypted_private_key)
    create_record(new_record)
    return {"message": "OK",
            "id": new_id}, 200


@app.route("/encrypt", methods=["POST"])
def encrypt():
    validator(request, ["password", "id"])
    data = request.get_json()
    max_uses = convert_str_to_int(data["max_uses"], "Incorrect usage count") if "max_uses" in data.keys() else None
    expiry_hours = convert_str_to_int(data["expiry_hours"],
                                      "Incorrect expiry time") if "expiry_hours" in data.keys() else 0
    expiry_minutes = convert_str_to_int(data["expiry_minutes"],
                                        "Incorrect expiry time") if "expiry_minutes" in data.keys() else 0
    set_record_uses_expiry(data["id"], max_uses, expiry_hours, expiry_minutes)
    public_key = get_validate_record(data["id"]).public_key
    secret = encrypt_password(public_key, data["password"])

    return {"message": "OK",
            "secret": str(secret, "utf-8"),
            "id": data["id"]}, 200


@app.route("/decrypt", methods=["POST"])
def decrypt():
    validator(request, ["id", "secret"])
    data = request.get_json()
    record = get_validate_record(data["id"])
    if record.max_uses is not None:
        decrease_record_uses(record.id)
    private_key = AESEncryption().decrypt(record.private_key)
    try:
        password = decrypt_password(private_key, base64.b64decode(data["secret"].replace(" ", "+")))
    except binascii.Error:
        raise werkzeug.exceptions.BadRequest("Incorrect secret")
    return {"message": "OK",
            "password": password}, 200
