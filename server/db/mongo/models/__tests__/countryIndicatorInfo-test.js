import mongoose from 'mongoose';

let CountryIndicatorInfo;

describe('CountryIndicatorInfo model', () => {
  beforeAll(() => {
    CountryIndicatorInfo = mongoose.models.CountryIndicatorInfo ||
      require('../countryIndicatorInfo').default();
  });

  test('returns the model instance', () => {
    expect(
      CountryIndicatorInfo
    ).toBeTruthy();
  });

  test('adds the model to mongoose.models', () => {
    expect(
      typeof mongoose.models.CountryIndicatorInfo
    ).toEqual('function');
  });

  test('is invalid if _id is empty', (done) => {
    const c = new mongoose.models.CountryIndicatorInfo();
    c.validate((error) => {
      expect(error.errors['_id'].message).toMatch(/`_id` is required/);
      done();
    });
  });

  test('is invalid if country, countryDisplay, indicator, indicatorDisplay, ' +
    'importance, source, description is empty', (done) => {
    const c = new mongoose.models.CountryIndicatorInfo({
      _id: 'test_id'
    });
    c.validate((error) => {
      const requiredFields =
        ['country', 'countryDisplay', 'indicator', 'indicatorDisplay',
         'importance', 'source', 'description'];
      for (const field of requiredFields) {
        expect(error.errors[field].message)
          .toMatch(new RegExp(`\`${field}\` is required`));
      }
      done();
    });
  });

  test('is valid if all required fields are populated', (done) => {
    const c = new mongoose.models.CountryIndicatorInfo({
      _id: 'test_id',
      country: 'united-states',
      countryDisplay: 'United States',
      indicator: 'gdp',
      indicatorDisplay: 'GDP',
      importance: 'high',
      source: 'the source',
      description: 'the description'
    });
    c.validate((error) => {
      expect(error).toBeFalsy();
      done();
    });
  });
});
