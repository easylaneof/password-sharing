from flask import Flask
from flask import Blueprint
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.config.from_object("application.config.DevelopmentConfig")
    CORS(app, supports_credentials=True)
    db.init_app(app)
    with app.app_context():
        from application.routes import general, error_handling
        from application import dbmodels
        db.create_all()
    return app
