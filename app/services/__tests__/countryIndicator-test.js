import createRestApiClient from '../../utils/createRestApiClient';
import createCountryIndicatorService from '../../services/countryIndicator';

jest.mock('../../utils/createRestApiClient');

describe('countryIndicator service', () => {
  const mockApi = () => {
    const spy = jest.fn().mockImplementation(() => Promise.resolve({
      data: 'response'
    }));
    createRestApiClient.mockImplementation(() => {
      return {
        withConfig: () => ({request: spy})
      };
    });
    return spy;
  };

  describe('#getCountryIndicator', () => {
    test('makes a client request to the country indicator data endpoint',
    (done) => {
      const params = {
        country: 'united-states',
        indicator: 'gdp',
        releaseDateBefore: '2018-01-01',
        perPage: 20
      };
      const getCountryIndicatorSpy = mockApi();
      createCountryIndicatorService().getCountryIndicator(params)
      .then(() => {
        expect(getCountryIndicatorSpy)
        .toHaveBeenCalledWith({
          method: 'GET',
          params,
          url: '/country-indicator-data'
        });
        expect(getCountryIndicatorSpy).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });
});
