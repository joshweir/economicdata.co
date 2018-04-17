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
});
