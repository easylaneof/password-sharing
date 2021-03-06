import binascii
from typing import Union, Tuple

from flask import request, Blueprint

from application.config import Config
from application.database import create_record, set_record_uses_and_expiry, \
    get_validate_record, decrease_record_uses
from application.dbmodels import Sessions
from application.email.email_utils import send_email, html_email
from application.encryption.aes_encryption import AESEncryption
from application.encryption.app_encryption import *
from application.utils import generate_id, validator, convert_str_to_non_negative_int, \
    convert_str_to_positive_int

general_bp = Blueprint("general_bp", __name__)


@general_bp.route("/generate", methods=["GET"])
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


@general_bp.route("/encrypt", methods=["POST"])
def encrypt():
    validator(request, ["password", "id"])
    data = request.get_json()
    max_uses = convert_str_to_positive_int(data["max_uses"],
                                           "Incorrect usage count") if "max_uses" in data.keys() else None
    expiry_hours = convert_str_to_non_negative_int(data["expiry_hours"],
                                                   "Incorrect expiry time") if "expiry_hours" in data.keys() else 0
    expiry_minutes = convert_str_to_non_negative_int(data["expiry_minutes"],
                                                     "Incorrect expiry time") if "expiry_minutes" in data.keys() else 0
    set_record_uses_and_expiry(data["id"], max_uses, expiry_hours, expiry_minutes)
    public_key = get_validate_record(data["id"]).public_key
    secret = encrypt_password(public_key, data["password"])

    return {"message": "OK",
            "secret": str(secret, "utf-8"),
            "id": data["id"]}, 200


@general_bp.route("/decrypt", methods=["POST"])
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


@general_bp.route("/send_email", methods=["POST"])
def send_email_route() -> Union[werkzeug.exceptions.BadRequest, Tuple[dict, int]]:
    validator(request, ["mail", "link"])
    data = request.get_json()
    link_to_send = data["link"]
    thrown_exception = None
    for _ in Config.SEND_EMAIL_RETRY_NUMBER:
        try:
            send_email(
                sender_email_address=Config.SENDER_EMAIL_ADDRESS,
                sender_email_password=Config.SENDER_EMAIL_PASSWORD,
                recipient_email_address=data["mail"],
                email_subject="Your password sharing link",
                email_html_body=html_email(link_to_send),
                smtp_server_host=Config.SMTP_SERVER_HOST,
                smtp_server_port=Config.SMTP_SERVER_PORT,
            )
            thrown_exception = None
        except Exception as e:
            thrown_exception = e
    if thrown_exception:
        return werkzeug.exceptions.BadRequest("Error occurred while sending an e-mail.")
    else:
        return {"message": "OK"}, 200
