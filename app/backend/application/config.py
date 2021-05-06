from os import environ, path
from dotenv import load_dotenv

basedir = (path.dirname(__file__))
load_dotenv(path.join(basedir, ".env"))


class Config:
    STATIC_FOLDER = "static"
    SQLALCHEMY_DATABASE_URI = environ.get("DATABASE_URI")
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
