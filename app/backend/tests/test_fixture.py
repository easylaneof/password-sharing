import pytest

from application import db, app as flask_app


@pytest.fixture
def app():
    yield flask_app


@pytest.fixture
def client(app):
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite://"
    with app.app_context():
        db.create_all()
    return app.test_client()