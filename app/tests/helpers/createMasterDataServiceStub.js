import sinon from 'sinon';
import * as masterDataService from '../../services/masterData';

const createMasterDataServiceStub = () => ({
  replace: method => ({
    with: (data) => {
      const sandbox = sinon.sandbox.create();
      sandbox.stub(masterDataService, 'default').returns({
        [method]: data
      });
      return sandbox;
    }
  })
});

export default createMasterDataServiceStub;
