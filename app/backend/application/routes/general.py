import binascii
from flask import current_app as app, request
from application.database import create_record, get_validate_record
from application.utils import generate_id, validator
from application.encryption import *
from application.dbmodels import Sessions


@app.route("/generate", methods=["GET"])
def generate():
    try:
        max_uses = int(request.args.get("expiration")) if "expiration" in request.args.keys() else None
    except ValueError:
        raise werkzeug.exceptions.BadRequest("Incorrect usage count")
    client_only = request.args.get("client_only") if "client_only" in request.args.keys() else False
    keys = generate_keys()
    new_id = generate_id()
    new_record = Sessions(id=new_id,
                          public_key=keys['public'],
                          max_uses=max_uses)
    response = {"message": "OK",
                "public_key": str(keys['public'], "utf-8"),
                "id": new_id}
    if not client_only:
        new_record.private_key = keys['private']
        new_record.client_only = True
        response['private_key'] = str(keys['private'], "utf-8")
    create_record(new_record)
    return response, 200


@app.route("/encrypt", methods=["POST"])
def encrypt():
    validator(request, ["public_key", "password", "id"])
    data = request.get_json()
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
    private_key = data['private_key'] if record.client_only else record.private_key
    try:
        password = decrypt_password(private_key, base64.b64decode(data['secret']))
    except binascii.Error:
        raise werkzeug.exceptions.BadRequest("Incorrect secret")
    return {"message": "OK",
            "password": password}, 200
