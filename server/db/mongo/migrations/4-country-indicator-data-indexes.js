'use strict';

module.exports.id = 'country-indicator-data-indexes';

module.exports.up = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  this.db.collection('countryIndicatorData')
    .createIndex({ countryIndicatorInfoId: 1, releaseDate: -1 });
  this.db.collection('countryIndicatorData')
    .createIndex({ isLatest: 1 });
  done();
};

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  done();
};
