var buttons = require('sdk/ui/button/action');
var browserWindows = require("sdk/windows").browserWindows;
var { viewFor } = require("sdk/view/core");
var { Class } = require('sdk/core/heritage');

var Accountabilibuddy = require('./accountabilibuddy');
var RedirectAction = require('./actions/redirect');

var button = buttons.ActionButton({
  id: "accountabilibuddy",
  label: "Accountabilibuddy",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleClick () {
  var chromeWindow = viewFor(browserWindows.activeWindow);
  chromeWindow.alert('Hey buddy');
}

var LolcatsBlocker = Class({
  initialize: function initialize () {
    this.redirect = new RedirectAction('http://google.ca');
  },
  check: function check (uri) {
    if (/lolcats/.test(uri)) {
      return this.redirect;
    }
  }
});

var buddy = new Accountabilibuddy(new LolcatsBlocker());
buddy.start();
