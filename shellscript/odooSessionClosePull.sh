#!/bin/sh
`sh -c "pkill -9 -f /opt/mua10k/shellscript/odoo_session_close.py"`
`sh -c "python /opt/mua10k/shellscript/odoo_session_close.py"`
`sh -c "sync; echo 3 > /proc/sys/vm/drop_caches"`
`echo "cok" >> /home/user/text.txt`
