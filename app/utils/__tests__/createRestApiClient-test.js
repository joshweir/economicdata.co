import axios from 'axios';
import createRestApiClient from '../createRestApiClient';

describe('RESTful api client', () => {
  let client;
  const apiEndpoint = 'http://localhost:3001';
  const requestParams = {
    url: '/test',
    method: 'POST',
    params: { id: '123' },
    data: { name: 'kending' }
  };

  beforeEach(() => {
    axios.mockClear();
    client = createRestApiClient()
    .withConfig({ baseUrl: apiEndpoint });
  });

  describe('.createRequestApiClient', () => {
    test('configures axios withConfig', () => {
      expect(axios.create)
      .toBeCalledWith({baseUrl: 'http://localhost:3001'});
    });
  });

  describe('#request', () => {
    test('calls axios with request params', (done) => {
      client.request(requestParams)
      .then(() => {
        expect(axios.request).toBeCalledWith(requestParams);
        return done();
      });
    });
  });
});
