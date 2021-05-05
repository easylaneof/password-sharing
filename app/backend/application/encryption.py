import werkzeug.exceptions
from Crypto.PublicKey import RSA
from Crypto.Cipher import AES, PKCS1_OAEP


def generate_keys():
    keys = RSA.generate(2048)
    return {"public": keys.public_key().exportKey(),
            "private": keys.exportKey()}


def encrypt_password(public_key: str, password: str):
    password = password.encode("utf-8")
    try:
        recipient_key = RSA.importKey(public_key)
    except ValueError:
        raise werkzeug.exceptions.BadRequest("Invalid RSA key")
    cipher = PKCS1_OAEP.new(recipient_key)
    ciphertext = cipher.encrypt(password)
    return str(ciphertext)

# def decrypt_password()
