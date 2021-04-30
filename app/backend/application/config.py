class Config:
    STATIC_FOLDER = 'static'


class DevelopmentConfig(Config):
    FLASK_ENV = 'development'
    TESTING = True


class ProductionConfig:
    FLASK_ENV = 'production'
    DEBUG = False
    TESTING = False
