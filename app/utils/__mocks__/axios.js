const axios = jest.genMockFromModule('axios');
axios.request = jest.fn(({url}) => {
    if (url === '/test') {
        return Promise.resolve({
            data: 'data'
        });
    }
});
axios.create = jest.fn(function () {
    return this;
});

module.exports = axios;
/*
module.exports = {
  request: jest.fn(({url}) => {
      if (url === '/test') {
          return Promise.resolve({
              data: 'data'
          });
      }
  }),
  create: jest.fn(function () {
      return this;
  })
};
*/
