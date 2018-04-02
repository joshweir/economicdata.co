import sinon from 'sinon';
import * as countryIndicatorService from '../../services/countryIndicator';

const createCountryIndicatorServiceStub = () => ({
  replace: method => ({
    with: (data) => {
      const sandbox = sinon.sandbox.create();
      sandbox.stub(countryIndicatorService, 'default').returns({
        [method]: data
      });
      return sandbox;
    }
  })
});

export default createCountryIndicatorServiceStub;
