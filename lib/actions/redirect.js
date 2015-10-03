'use strict';

var { Class } = require('sdk/core/heritage');
var { Cc, Ci } = require('chrome');
var Action = require('./');

function makeURI(aURL, aOriginCharset, aBaseURI) {
  var ioService = Cc["@mozilla.org/network/io-service;1"]
                  .getService(Ci.nsIIOService);
  return ioService.newURI(aURL, aOriginCharset, aBaseURI);
}

var RedirectAction = Class({
  extends: Action,
  initialize: function initialize() {
    Action.prototype.initialize.call(this);
    this.uri = makeURI.apply(undefined, arguments);
  },
  perform: function perform(oHttp) {
    oHttp.redirectTo(this.uri);
  }
});

module.exports = RedirectAction;
