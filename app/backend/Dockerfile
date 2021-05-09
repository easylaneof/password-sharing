FROM python:3.9
RUN mkdir /backend
WORKDIR /backend
COPY requirements.txt /backend/requirements.txt
RUN apt update && \
    apt install -y libev-dev libevdev2
RUN pip install --upgrade pip && \
    pip install -r requirements.txt && \
    pip install bjoern
COPY . ./
CMD ["python", "run.py"]