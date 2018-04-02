import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    getAvailableEntityTypes: () => client.request({
      method: 'GET',
      url: '/available-entity-types'
    }),
    getDefaultEntities: (params, firstAvailableEntityType) => client.request({
      method: 'GET',
      url: '/entities',
      params: {
        entity: firstAvailableEntityType
      }
    })
  };
};
