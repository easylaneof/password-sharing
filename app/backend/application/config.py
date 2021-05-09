from os import environ


class Config:
    SQLALCHEMY_DATABASE_URI = environ.get("DATABASE_URI")
    ENCRYPTION_KEY = environ.get("ENCRYPTION_KEY")
    ENCRYPTION_IV = environ.get("ENCRYPTION_IV")


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
