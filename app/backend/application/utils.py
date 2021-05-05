from uuid import uuid4

import werkzeug.exceptions


def generate_id():
    return str(uuid4())


def validator(request, keys):
    if not request.is_json:
        raise werkzeug.exceptions.BadRequest("Request isn't a JSON")
    request_dictionary = request.get_json()
    for key in keys:
        if key not in request_dictionary.keys():
            raise werkzeug.exceptions.BadRequest(f"Key Error: {key}")
