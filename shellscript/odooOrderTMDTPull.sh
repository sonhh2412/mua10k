#!/bin/sh
`sh -c "pkill -9 -f /opt/mua10k/shellscript/odoo_recieve_order.py"`
`sh -c "python /opt/mua10k/shellscript/odoo_recieve_order.py"`
`sh -c "sync; echo 3 > /proc/sys/vm/drop_caches"`
`echo "TMDT" >> /home/user/text.txt`