openerp.odoo_custom_title = function(instance) {
    instance.web.WebClient.include({
        init: function(parent, client_options) {
            this._super(parent, client_options);
            this.set('title_part', {"zopenerp": "10KMua - Chuyên Trang Thương Mại Điện Tử"});
        },
    });
};