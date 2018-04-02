module.exports.id = 'country-indicator-info';

module.exports.up = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  this.db.createCollection('countryIndicatorInfo', {
     validator: { $jsonSchema: {
        bsonType: 'object',
        required: [
          'country',
          'countryDisplay',
          'indicator',
          'indicatorDisplay',
          'importance',
          'source',
          'description'
        ],
        properties: {
           country: {
              bsonType: 'string',
              description: 'must be a string and is required'
           },
           countryDisplay: {
              bsonType: 'string',
              description: 'must be a string and is required'
           },
           indicator: {
              bsonType: 'string',
              description: 'must be a string and is required'
           },
           indicatorDisplay: {
              bsonType: 'string',
              description: 'must be a string and is required'
           },
           importance: {
              bsonType: 'string',
              description: 'must be a string and is required'
           },
           source: {
              bsonType: 'string',
              description: 'must be a string and is required'
           },
           description: {
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
  this.db.collection('countryIndicatorInfo').drop();
  done();
};
