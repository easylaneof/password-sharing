from flask import current_app as app, request
from application.app import db
from application.utils import generate_id, validator
from application.encryption import *
from application.dbmodels import Sessions


@app.route("/generate", methods=["GET"])
def generate():
    keys = generate_keys()
    new_id = generate_id()
    new_session = Sessions(
        id=new_id,
        public_key=keys['public'],
        private_key=keys['private']
    )
    db.session.add(new_session)
    db.session.commit()

    return {"message": "OK",
            "public_key": str(keys['public'], "utf-8"),
            "id": new_id}, 200


@app.route("/encrypt", methods=["POST"])
def encrypt():
    validator(request, ["public_key", "password", "id"])
    data = request.get_json()
    secret = encrypt_password(str.encode(data['public_key']), data['password'])

    return {"message": "OK",
            "secret": secret,
            "id": data['id'],
            "public_key": data['public_key']}, 200
