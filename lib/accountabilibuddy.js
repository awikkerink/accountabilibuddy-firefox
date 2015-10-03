var { Class } = require('sdk/core/heritage');
var { Unknown, Factory } = require('sdk/platform/xpcom');
var { Cc, Ci } = require('chrome');
var browserWindows = require("sdk/windows").browserWindows;
var Action = require('./actions');

var Accountabilibuddy = Class({
  initialize: function initialize(checker) {
    this.checker = checker;
  },

  // Initialisation and termination functions
  start : function() {
    this.addToListener();
  },

  stop : function() {
    this.removeFromListener();
  },

  // This is the observerService's observe listener.
  observe: function(aSubject, aTopic, aData) {
   aSubject.QueryInterface(Ci.nsIHttpChannel);

   var action = this.check(aSubject);
   if (action instanceof Action) {
     action.perform(aSubject);
   }
  },

  check: function (oHttp) {
   var uri = oHttp.URI.asciiSpec;

   return this.checker.check(uri);
  },

  addToListener: function() {
    // Register new request and response listener
    // Should be a new version of  Mozilla/Phoenix (after september 15, 2003)
    var observerService = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
    observerService.addObserver(this, "http-on-modify-request",   false);
    //observerService.addObserver(this, "http-on-examine-response", false);
  },

  removeFromListener: function() {
    // Unregistering listener
    var observerService = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
    //observerService.removeObserver(this, "http-on-examine-response");
    observerService.removeObserver(this, "http-on-modify-request");
  }
});

module.exports = Accountabilibuddy;
