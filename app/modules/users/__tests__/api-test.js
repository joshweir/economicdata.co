import createRestApiClient from '../../../utils/createRestApiClient';
import api from '../api';

jest.mock('../../../utils/createRestApiClient');

describe('authentication service', () => {
  const mockApi = () => {
    const spy = jest.fn().mockImplementation(() => Promise.resolve({
      data: 'request response'
    }));
    createRestApiClient.mockImplementation(() => {
      return {
        withConfig: () => ({request: spy})
      };
    });
    return spy;
  };
  const spy = mockApi();
  const data = {
    email: 'josh@example.com',
    password: 'pass_word'
  };

  describe('#login', () => {
    test('makes a client POST request to the /sessions endpoint',
    (done) => {
      api().login(data)
      .then(() => {
        expect(spy)
        .toHaveBeenCalledWith({
          method: 'POST',
          data,
          url: '/sessions'
        });
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });

  describe('#signUp', () => {
    test('makes a client POST request to the /users endpoint',
    (done) => {
      spy.mockClear();
      api().signUp(data)
      .then(() => {
        expect(spy)
        .toHaveBeenCalledWith({
          method: 'POST',
          data,
          url: '/users'
        });
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });

  describe('#logOut', () => {
    test('makes a client DELETE request to the /sessions endpoint',
    (done) => {
      spy.mockClear();
      api().logOut()
      .then(() => {
        expect(spy)
        .toHaveBeenCalledWith({
          method: 'DELETE',
          url: '/sessions'
        });
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });
});
