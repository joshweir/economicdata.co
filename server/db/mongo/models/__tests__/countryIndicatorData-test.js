import expect from 'expect';
import mongoose from 'mongoose';

let CountryIndicatorData;

describe('CountryIndicatorData model', () => {
  before(() => {
    CountryIndicatorData = mongoose.models.CountryIndicatorData ||
      require('../countryIndicatorData').default();
  });

  it('returns the model instance', () => {
    expect(
      CountryIndicatorData
    ).toExist();
  });

  it('adds the model to mongoose.models', () => {
    expect(
      typeof mongoose.models.CountryIndicatorData
    ).toEqual('function');
  });

  it('is invalid if countryIndicatorInfoId, releaseDate ' +
    'actual is empty', (done) => {
    const c = new mongoose.models.CountryIndicatorData();
    c.validate((error) => {
      const requiredFields =
        ['countryIndicatorInfoId', 'releaseDate', 'actual'];
      for (const field of requiredFields) {
        expect(error.errors[field].message)
          .toMatch(new RegExp(`\`${field}\` is required`));
      }
      done();
    });
  });

  it('is valid if all required fields are populated', (done) => {
    const c = new mongoose.models.CountryIndicatorData({
      countryIndicatorInfoId: 'united-states|gdp',
      releaseDate: new Date('2014-01-02 16:59:59'),
      actual: 'actual value'
    });
    c.validate((error) => {
      expect(error).toNotExist();
      done();
    });
  });
});
