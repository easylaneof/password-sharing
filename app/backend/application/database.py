import werkzeug.exceptions
from datetime import datetime, timedelta
from application.dbmodels import Sessions
from application import db


def create_record(session: Sessions):
    db.session.add(session)
    db.session.commit()


def get_validate_record(record_id: str):
    db_record = db.session.query(Sessions).filter_by(id=record_id).first()
    if db_record is None:
        raise werkzeug.exceptions.BadRequest("Incorrect ID or the link has expired")
    if db_record.expiry and db_record.expiry < datetime.utcnow():
        delete_record(record_id)
        raise werkzeug.exceptions.BadRequest("Incorrect ID or the link has expired")
    return db_record


def delete_record(record_id: str):
    db.session.query(Sessions).filter_by(id=record_id).delete()
    db.session.commit()


def set_record_uses_and_expiry(record_id: str, max_uses: int, expiry_hours: int, expiry_minutes: int):
    record = db.session.query(Sessions).filter_by(id=record_id).first()
    if record is None:
        raise werkzeug.exceptions.BadRequest("Incorrect ID")
    record.max_uses = max_uses
    if not (expiry_hours == 0 and expiry_minutes == 0):
        td = timedelta(hours=expiry_hours,
                       minutes=expiry_minutes)
        record.expiry = datetime.utcnow() + td
    db.session.commit()


def decrease_record_uses(record_id: str):
    record = db.session.query(Sessions) \
        .filter_by(id=record_id).first()
    record.max_uses = Sessions.max_uses - 1
    db.session.commit()
    if record.max_uses == 0:
        delete_record(record_id)
