FROM python:3-alpine
RUN mkdir /backend
WORKDIR /backend
COPY requirements.txt /backend/requirements.txt
RUN apk update && \
    apk add build-base mariadb-dev libev-dev mariadb-connector-c && \
    pip install -r requirements.txt && \
    pip install bjoern && \
    apk del build-base mariadb-dev
COPY . ./
CMD ["python", "run.py"]