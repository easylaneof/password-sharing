from application import db


class Sessions(db.Model):
    __tablename__ = "sessions"

    id = db.Column(
        db.String(50),
        primary_key=True,
        index=True,
        unique=True,
        nullable=False
    )
    public_key = db.Column(
        db.VARBINARY(2048),
        nullable=False
    )
    private_key = db.Column(
        db.VARBINARY(2048),
        nullable=True
    )
    max_uses = db.Column(
        db.INT,
        nullable=True,
        default=None
    )
