'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,
  // MongoDB connection options
  mongo: {
    uri:    process.env.OPENSHIFT_MONGODB_DB_URL ||
            'mongodb://admin10kmua:Admin10kmua#$%@127.0.0.1:27017/10k_product'
  },

  seedDB: false
};
 
