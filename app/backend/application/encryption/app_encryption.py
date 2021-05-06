import base64

import werkzeug.exceptions
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP


def generate_keys():
    keys = RSA.generate(1024)
    return {"public": keys.public_key().exportKey(),
            "private": keys.exportKey()}


def encrypt_password(public_key: bytes, password: str):
    password = password.encode("utf-8")
    try:
        recipient_key = RSA.importKey(public_key)
    except ValueError:
        raise werkzeug.exceptions.BadRequest("Invalid RSA key")
    cipher = PKCS1_OAEP.new(recipient_key)
    ciphertext = cipher.encrypt(password)
    return base64.b64encode(ciphertext)


def decrypt_password(private_key: bytes, secret: bytes):
    try:
        encryption_key = RSA.importKey(private_key)
    except ValueError:
        raise werkzeug.exceptions.BadRequest("Invalid private key")
    cipher = PKCS1_OAEP.new(encryption_key)
    try:
        password = cipher.decrypt(secret)
    except ValueError:
        raise werkzeug.exceptions.BadRequest("Invalid secret")
    return str(password, "utf-8")
