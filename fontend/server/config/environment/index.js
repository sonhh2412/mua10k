'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================

process.env.NODE_ENV = 'production';

process.env.PORT = 9971; //cau hinh port chay ngnix

process.env.PREFIX = 'rmp_';

process.env.PREFIX_ERR_MQ = 'err_rmp_'
// proxy_set_header  X-Real-IP  $remote_addr;
var all = {  

  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'fd34s@!@dfa453f3DF#$D&W'
  },


  /*doamin dung de bam vao link khich hoat trong email*/

  domain : '10kmua.vn',

  /*cau hinh sms nap tien VMG*/

  sms : {
    cmdCode : 'BulkSendSms', //loai gui tin nhan cham soc khach hang
    alias : '0902137588', //alias cua VND
    authenticateUser: 'simi',
    authenticatePass : 'vmg123456',
    url : 'http://brandsms.vn:8018/vmgApi',
    msisdn : '84',
    createUser : '10kMua thong bao MA KICH HOAT cua ban la: ', //ky tu gui tin nhan khi tao user
    descriptionUser: '. Tin nhan co hieu luc trong 15 phut', //ky tu mo ta thoi gian hieu luc khi tao user
    forgotPassword : '10kMua thong bao ma QUEN MAT KHAU cua ban la: ', //ky tu gui tin nhan Quen mat khau
    descriptionPassword: '. Tin nhan co hieu luc trong 15 phut', //ky tu mo ta thoi gian hieu luc Quen mat khau
    sendTime : '' //thoi gian cho gui di

  },

  /*cau hinh email smtp cho user 
  dung dang ky tai khoan moi va quem mat khau*/
  // xjymtcuzugkycypf
  email : {
    service : 'Gmail',
    auth : {
         user: "10kmua.vn@gmail.com",
         pass: "xjymtcuzugkycypf" //mat kau smtp gmail
    },
    from : '<10kmua.vn@gmail.com>'
  },


  /*API ngan luong*/

  nganluong_card : {
    func : 'CardCharge', /*dung cho NTC goi function ben nganluong*/
    version : '2.0', /*version ma ngan luong dang su dung*/
    merchant_id : '50295', /*id tai khoan*/
    merchant_account : '10kmua.vn@gmail.com', /*account tai khoan*/
    merchant_password : 'b9bac6d7e69efbedb017412fcd30c6c4', /*mat khau bi mat cua ngan luong*/
    merchant_url : 'http://exu.vn/mobile_card.api.post.v2.php', /*link dung de goi function */

  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  facebook: {
    clientID:     process.env.FACEBOOK_ID || 'id',
    clientSecret: process.env.FACEBOOK_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
  },

  twitter: {
    clientID:     process.env.TWITTER_ID || 'id',
    clientSecret: process.env.TWITTER_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
  },

  google: {
    clientID:     process.env.GOOGLE_ID || 'id',
    clientSecret: process.env.GOOGLE_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
  }
};


module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
