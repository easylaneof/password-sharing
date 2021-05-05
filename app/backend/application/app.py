from flask import Flask
from flask import Blueprint
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import event
from sqlalchemy.engine import Engine

main = Blueprint('main', __name__)
db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.config.from_object('config.DevelopmentConfig')
    CORS(app, supports_credentials=True)
  #  db.init_app(app)
    app.register_blueprint(main)
    with app.app_context():
        from routes import general
        import dbmodels
#        db.create_all()
        return app


@event.listens_for(Engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()


application = create_app()

if __name__ == '__main__':
    application.run()
