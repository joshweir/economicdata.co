import mongoose from 'mongoose';

let CountryIndicatorData;

describe('CountryIndicatorData model', () => {
  beforeAll(() => {
    CountryIndicatorData = mongoose.models.CountryIndicatorData ||
      require('../countryIndicatorData').default();
  });

  test('returns the model instance', () => {
    expect(
      CountryIndicatorData
    ).toBeTruthy();
  });

  test('adds the model to mongoose.models', () => {
    expect(
      typeof mongoose.models.CountryIndicatorData
    ).toEqual('function');
  });

  test('is invalid if countryIndicatorInfoId, releaseDate ' +
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

  test('is valid if all required fields are populated', (done) => {
    const c = new mongoose.models.CountryIndicatorData({
      countryIndicatorInfoId: 'united-states|gdp',
      releaseDate: new Date('2014-01-02 16:59:59'),
      actual: 'actual value'
    });
    c.validate((error) => {
      expect(error).toBeFalsy();
      done();
    });
  });
});
