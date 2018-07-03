scp -P 60022 /opt/favant/DBbackups/* root@demo60.icsc.vn:/home/Database_backup/
sh -c "sync; echo 3 > /proc/sys/vm/drop_caches
find /var/log -type f -name "*.gz" -delete
/etc/cron.daily/logrotate
rm -rfv /var/log/postgresql/
rm -rfv /var/log/openerp/