from flask import make_response, current_app as app, jsonify, request


@app.route('/')
def test():
    return make_response(jsonify({'Hello': 'World'}), 200)
