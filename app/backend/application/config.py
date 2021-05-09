from os import environ


class Config:
    SQLALCHEMY_DATABASE_URI = environ.get("DATABASE_URI")
    ENCRYPTION_KEY = environ.get("ENCRYPTION_KEY")
    ENCRYPTION_IV = environ.get("ENCRYPTION_IV")
    SENDER_EMAIL_ADDRESS = environ.get("SENDER_EMAIL_ADDRESS")
    SENDER_EMAIL_PASSWORD = environ.get("SENDER_EMAIL_PASSWORD")
    SEND_EMAIL_RETRY_NUMBER = int(environ.get("SEND_EMAIL_RETRY_NUMBER", 3))
    SMTP_SERVER_HOST = environ.get("SMTP_SERVER_HOST")
    SMTP_SERVER_PORT = int(environ.get("SMTP_SERVER_PORT", 587))


class DevelopmentConfig(Config):
    FLASK_ENV = "development"
    TESTING = True
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig(Config):
    FLASK_ENV = "production"
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class TestConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite://"
    ENCRYPTION_KEY = "PdQXZSYqSDPQspbKlAt6y9QQPg4ZRBPF"
    ENCRYPTION_IV = "d412tCf2HA2xDxJO"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
