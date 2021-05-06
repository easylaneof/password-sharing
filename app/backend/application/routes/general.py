import binascii
from flask import current_app as app, request
from application.database import *
from application.utils import generate_id, validator
from application.encryption import *
from application.dbmodels import Sessions


@app.route("/generate", methods=["GET"])
def generate():
    keys = generate_keys()
    new_id = generate_id()
    new_record = Sessions(id=new_id,
                          public_key=keys['public'],
                          private_key=keys['private'])
    create_record(new_record)
    return {"message": "OK",
            "public_key": str(keys['public'], "utf-8"),
            "id": new_id}, 200


@app.route("/encrypt", methods=["POST"])
def encrypt():
    validator(request, ["public_key", "password", "id"])
    data = request.get_json()
    try:
        max_uses = int(data['max_uses']) if "max_uses" in data.keys() else None
    except ValueError:
        raise werkzeug.exceptions.BadRequest("Incorrect usage count")
    set_record_uses(data['id'], max_uses)
    secret = encrypt_password(str.encode(data['public_key']), data['password'])

    return {"message": "OK",
            "secret": str(secret, "utf-8"),
            "id": data['id'],
            "public_key": data['public_key']}, 200


@app.route("/decrypt", methods=["POST"])
def decrypt():
    validator(request, ["public_key", "id", "secret"])
    data = request.get_json()
    record = get_validate_record(data['id'])
    if record.max_uses is not None:
        decrease_record_uses(record.id)
    private_key = record.private_key
    try:
        password = decrypt_password(private_key, base64.b64decode(data['secret']))
    except binascii.Error:
        raise werkzeug.exceptions.BadRequest("Incorrect secret")
    return {"message": "OK",
            "password": password}, 200
