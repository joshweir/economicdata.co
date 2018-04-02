module.exports.id = 'country-indicator-data';

module.exports.up = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  this.db.createCollection('countryIndicatorData', {
     validator: { $jsonSchema: {
        bsonType: 'object',
        required: [
          'countryIndicatorInfoId',
          'releaseDate',
          'actual'
        ],
        properties: {
           countryIndicatorInfoId: {
              bsonType: 'string',
              description: 'must be a string and is required'
           },
           releaseDate: {
              bsonType: 'date',
              description: 'must be a date and is required'
           },
           actual: {
              bsonType: 'string',
              description: 'must be a string and is required'
           },
           previous: {
              bsonType: 'string',
              description: 'must be a string and is required'
           },
           forecast: {
              bsonType: 'string',
              description: 'must be a string and is required'
           }
        }
      }
    }
  });
  done();
};

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  this.db.collection('countryIndicatorData').drop();
  done();
};
