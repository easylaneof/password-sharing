from flask import make_response, current_app as app, jsonify, request


@app.route('/encrypt')
def encrypt():

    return make_response(jsonify({'Hello': 'World'}), 200)
