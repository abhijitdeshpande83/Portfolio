#!/bin/bash
python manage.py migrate

# load the schedule into cron's memory
crontab /portfolio/crontab.txt

# start the cron daemon in the background
service cron start

# start gunicorn in the foreground (keeps the container alive)
exec gunicorn portfolio.wsgi:application --bind 0.0.0.0:8000