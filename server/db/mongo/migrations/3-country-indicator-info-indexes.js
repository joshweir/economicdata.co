'use strict';

module.exports.id = 'country-indicator-info-indexes';

module.exports.up = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  this.db.collection('countryIndicatorInfo').createIndex({ country: 1 });
  done();
};

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  done();
};
