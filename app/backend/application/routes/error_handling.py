import werkzeug.exceptions
from flask import current_app as app, Blueprint


@app.errorhandler(werkzeug.exceptions.BadRequest)
def bad_request(e):
    return {"message": str(e.description)}, 400
