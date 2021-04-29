from flask import Flask
from flask import Blueprint
from flask_cors import CORS
main = Blueprint('main', __name__)


def create_app():
    app = Flask(__name__)
    app.config.from_object('config.DevelopmentConfig')
    CORS(app, supports_credentials=True)
    app.register_blueprint(main)
    with app.app_context():
        from application.routes import general
        return app
