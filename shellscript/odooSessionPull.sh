#!/bin/sh
`sh -c "pkill -9 -f /opt/mua10k/shellscript/odoo_session_add.py"`
`sh -c "python /opt/mua10k/shellscript/odoo_session_add.py"`
`sh -c "sync; echo 3 > /proc/sys/vm/drop_caches"`
`echo "sok" >> /home/user/text.txt`
