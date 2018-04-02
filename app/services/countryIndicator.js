import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    getCountryIndicator: ({ country, indicator, releaseDateBefore, perPage = 50 }) => {
      return client.request({
        method: 'GET',
        url: '/country-indicator-data',
        params: {
          country, indicator, releaseDateBefore, perPage
        }
      });
      /*
      return Promise.resolve({
        data: {
          indicatorInfo: {
            country: country,
            countryDisplay: country.toUpperCase(),
            indicator: indicator,
            indicatorDisplay: indicator.toUpperCase(),
            importance: 'high',
            source: '<a href="my-slug" target="_target" onClick="evil()">the source</a>',
            description: '<p>The <strong>description</strong></p>'
          },
          indicatorData: [
            {
              releaseDate: 'Mar 30, 2018',
              actual: country === 'united-states' ? '0.8%' : '1.8%',
              forecast: indicator === 'gdp' ? '0.9%' : '1.9%',
              previous: '0.7%'
            },
            {
              releaseDate: 'Feb 28, 2018',
              actual: '0.1%',
              forecast: '0.2%',
              previous: '0.3%'
            },
          ],
          countrySelected: 'united-states',
          countrySelectedIndicators: [
            {value: 'gdp', label: 'GDP'},
            {value: 'cpi', label: 'CPI'}
          ],
          countryIndicatorSelected: 'gdp'
        }
      });
      */
    }
  };
};
