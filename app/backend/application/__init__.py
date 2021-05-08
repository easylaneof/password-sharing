from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from application.config import DevelopmentConfig

db = SQLAlchemy()


def create_app(config_object=DevelopmentConfig):
    app = Flask(__name__)
    app.config.from_object(config_object)
    CORS(app, supports_credentials=True)
    db.init_app(app)
    with app.app_context():
        from application import dbmodels
        from application.routes import error_handling
        from application.routes.general import general_bp
        app.register_blueprint(general_bp)
        db.create_all()
    return app
