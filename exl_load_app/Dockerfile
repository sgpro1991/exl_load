FROM python:3.6
COPY exl_load /app/
RUN pip install -r /app/requirements.txt

ENTRYPOINT uwsgi --chdir=/app/  --module=exl_load.wsgi:application --env DJANGO_SETTINGS_MODULE=exl_load.settings --master --pidfile=/tmp/project-master.pid --enable-threads --http :9090
