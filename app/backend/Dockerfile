FROM python:3.9
RUN mkdir /flask
WORKDIR /flask
COPY requirements.txt /flask/requirements.txt
RUN pip install --upgrade pip && \
    pip install -r requirements.txt
COPY . ./