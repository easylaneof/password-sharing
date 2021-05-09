from os import environ


class Config:
    STATIC_FOLDER = "static"
    SQLALCHEMY_DATABASE_URI = environ["DATABASE_URI"]
    ENCRYPTION_KEY = environ["ENCRYPTION_KEY"]
    ENCRYPTION_IV = environ["ENCRYPTION_IV"]
    JWT_TOKEN_LOCATION = ("headers", "query_string")
    JWT_QUERY_STRING_NAME = "token"
    JWT_HEADER_TYPE = ""


class DevelopmentConfig(Config):
    FLASK_ENV = "development"
    TESTING = True
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig(Config):
    FLASK_ENV = "production"
    DEBUG = False
    TESTING = False


class TestConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite://"
    ENCRYPTION_KEY = "PdQXZSYqSDPQspbKlAt6y9QQPg4ZRBPF"
    ENCRYPTION_IV = "d412tCf2HA2xDxJO"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
