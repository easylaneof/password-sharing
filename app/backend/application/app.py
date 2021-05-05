from flask import Flask
from flask import Blueprint
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

main = Blueprint('main', __name__)
db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.config.from_object('config.DevelopmentConfig')
    CORS(app, supports_credentials=True)
    db.init_app(app)
    app.register_blueprint(main)
    with app.app_context():
        from routes import general, error_handling
        import dbmodels
        db.create_all()
        return app


application = create_app()

if __name__ == '__main__':
    application.run()
