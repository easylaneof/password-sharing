import werkzeug.exceptions
from flask import current_app as app

error_handlers_bp = Blueprint('error_handlers_bp', __name__)


@error_handlers_bp.app_errorhandler(werkzeug.exceptions.BadRequest)
def bad_request(e):
    return {"message": str(e.description)}, 400
