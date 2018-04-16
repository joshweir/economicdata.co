import createRestApiClient from '../../../utils/createRestApiClient';
import api from '../api';

jest.mock('../../../utils/createRestApiClient');

describe('masterData service', () => {
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

  const masterData = [
    {
      country: 'united-states',
      countryLabel: 'United States',
      indicators: [
        {value: 'gdp', label: 'GDP'},
        {value: 'cpi', label: 'CPI'}
      ]
    },
    {
      country: 'australia',
      countryLabel: 'Australia',
      indicators: [
        {value: 'gdp-2', label: 'GDP-2'},
        {value: 'cpi-2', label: 'CPI-2'}
      ]
    },
  ];

  describe('#getMasterData', () => {
    test('makes a client request to the master data endpoint',
    (done) => {
      const getMasterDataSpy = mockApi();
      api().getMasterData()
      .then(() => {
        expect(getMasterDataSpy)
        .toHaveBeenCalledWith({
          method: 'GET',
          url: '/master-data'
        });
        expect(getMasterDataSpy).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });

  describe('#extractCountriesList', () => {
    test('extracts the countries (label and value) from input master data',
    (done) => {
      const expected = [
        {value: 'united-states', label: 'United States'},
        {value: 'australia', label: 'Australia'}
      ];
      api().extractCountriesList({from: masterData})
      .then((data) => {
        expect(data).toEqual(expected);
        done();
      });
    });
  });

  describe('#extractCountryIndicatorsList', () => {
    test('extracts the country indicators from input master data, ' +
         'based on input country',
    (done) => {
      const country = 'australia';
      const expected = [
        {value: 'gdp-2', label: 'GDP-2'},
        {value: 'cpi-2', label: 'CPI-2'}
      ];
      api()
      .extractCountryIndicatorsList({
        from: masterData, country
      })
      .then((data) => {
        expect(data).toEqual(expected);
        done();
      });
    });
  });
});
