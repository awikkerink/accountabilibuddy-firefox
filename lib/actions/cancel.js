'use strict';

var { Class } = require('sdk/core/heritage');
var { Cr } = require('chrome');
var Action = require('./');

function makeURI(aURL, aOriginCharset, aBaseURI) {
  var ioService = Cc["@mozilla.org/network/io-service;1"]
                  .getService(Ci.nsIIOService);
  return ioService.newURI(aURL, aOriginCharset, aBaseURI);
}

var CancelAction = Class({
  extends: Action,
  initialize: function initialize() {
    Action.prototype.initialize.call(this);
  },
  perform: function perform(oHttp) {
    oHttp.cancel(Cr.NS_BINDING_ABORTED);
  }
});

module.exports = CancelAction;
