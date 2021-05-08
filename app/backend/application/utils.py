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


def convert_str_to_non_negative_int(string: str, error_message: str):
    try:
        converted = int(string)
        return converted
    except ValueError:
        raise werkzeug.exceptions.BadRequest(error_message)


def convert_str_to_positive_int(string: str, error_message: str):
    integer = convert_str_to_non_negative_int(string, error_message)
    if integer == 0:
        raise werkzeug.exceptions.BadRequest(error_message)
    return integer
