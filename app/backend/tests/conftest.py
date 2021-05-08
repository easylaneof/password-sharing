from unittest import mock
import pytest
from webtest import TestApp
from application import create_app, db as _db, config


@pytest.yield_fixture(scope='function')
def app():
    """An application for the tests."""
    _app = create_app(config.TestConfig)
    with _app.app_context():
        _db.create_all()
    ctx = _app.test_request_context()
    ctx.push()

    yield _app

    ctx.pop()


@pytest.fixture(scope='function')
def testapp(app):
    """A Webtest app."""
    return TestApp(app)


@pytest.fixture(scope='function')
def mock_encryption_env_vars():
    with mock.patch("application.encryption.aes_encryption.Config") as _fixture:
        _fixture.ENCRYPTION_KEY = "PdQXZSYqSDPQspbKlAt6y9QQPg4ZRBPF"
        _fixture.ENCRYPTION_IV = "d412tCf2HA2xDxJO"
        yield _fixture
