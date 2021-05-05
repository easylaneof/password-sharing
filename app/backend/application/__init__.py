from flask import Flask
from flask import Blueprint
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object('application.config.DevelopmentConfig')
db = SQLAlchemy(app)
CORS(app, supports_credentials=True)
with app.app_context():
    from application.routes import general, error_handling
    from application import dbmodels
    db.create_all()