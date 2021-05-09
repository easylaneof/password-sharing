import os

from application import create_app, config

if __name__ == "__main__":
    if os.environ["FLASK_ENV"] == 'production':
        app = create_app(config_object=config.ProductionConfig)
        import bjoern
        bjoern.run(app, "0.0.0.0", 5000)
    else:
        app = create_app()
        app.run(host='0.0.0.0')
