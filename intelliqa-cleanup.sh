#!/bin/bash
cd /portfolio || exit 1
echo "[Cron] Running cleanup at $(date)" >> /var/log/intelliqa-cleanup.log
/usr/local/bin/python manage.py run_cleanup >> /var/log/intelliqa-cleanup.log 2>&1
