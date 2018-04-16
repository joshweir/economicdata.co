import { apiEndpoint } from '../../../config/app';
import createRestApiClient from '../../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    getMasterData: () => {
      return client.request({
        method: 'GET',
        url: '/master-data'
      });
    },
    extractCountriesList: ({ from }) => {
      return Promise.resolve(from.map((d) => {
        return {label: d.countryLabel, value: d.country};
      }));
    },
    extractCountryIndicatorsList: ({ from, country }) => {
      return Promise.resolve(
        from.filter(d => d.country === country)[0].indicators);
    }
  };
};
