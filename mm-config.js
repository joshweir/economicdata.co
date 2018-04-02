var _lodash = require('lodash');

var connection = function () {
  var url = process.env.MONGOHQ_URL || process.env.MONGODB_URI;
  if (!url) {
    var dbHost = process.env.MONGOHQ_HOST || process.env.MONGODB_HOST || 'localhost';
    var dbPort = process.env.MONGOHQ_PORT || process.env.MONGODB_PORT || '27017';
    var dbUser = process.env.MONGOHQ_USER || process.env.MONGODB_USER || null;
    var dbPass = process.env.MONGOHQ_PASS || process.env.MONGODB_PASS || null;
    var dbName = process.env.MONGOHQ_NAME || process.env.MONGODB_NAME ||
      (process.env.NODE_ENV === 'production' ? 'EconomicData' : 'EconomicData_Dev');
    url = 'mongodb://' + (dbUser ? dbUser + ':' + dbPass + '@' : '') +
      dbHost + (dbPort ? ':' + dbPort : '') + '/' + dbName;
  }
  return {
    url:  url
  };
};

var collection = function () {
  return {
    collection: 'migrations'
  };
};

var directory = function () {
  return {
    directory: './server/db/mongo/migrations'
  };
};

module.exports = _lodash.assign({}, connection(), collection(), directory());
