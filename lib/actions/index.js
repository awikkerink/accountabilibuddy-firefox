var { Class } = require('sdk/core/heritage');

var Action = Class({
  initialize: function initialize() {},
  perform: function perform(oHttp) {
    throw new Error('Method not implemented');
  }
});


module.exports = Action;
