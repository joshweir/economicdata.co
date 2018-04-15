import createRestApiClient from '../../utils/createRestApiClient';
import createAuthenticationService from '../../services/authentication';

jest.mock('../../utils/createRestApiClient');

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

  describe('#login', () => {
    test('makes a client POST request to the /sessions endpoint',
    (done) => {
      const data = {
        email: 'josh@example.com',
        password: 'pass_word'
      };
      const spy = mockApi();
      createAuthenticationService().login(data)
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
});
