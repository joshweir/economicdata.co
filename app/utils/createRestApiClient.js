import axios from 'axios';
import { polyfill } from 'es6-promise';

polyfill();


class RestApiClient {
  constructor(config) {
    // hack to bypass proxy for axios
    // https://stackoverflow.com/a/43439886/4852737
    ['http_proxy', 'HTTP_PROXY', 'https_proxy', 'HTTPS_PROXY'].forEach((s) => {
      delete process.env[s];
    });
    this.client = axios.create(config);
  }

  request(options) {
    return this.client.request(options);
  }
}

const createRestApiClient = () => ({
  withConfig: config => new RestApiClient(config)
});

export default createRestApiClient;
