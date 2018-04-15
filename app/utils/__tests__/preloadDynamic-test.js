import { paramsHaveChanged, preloadDynamic } from '../preloadDynamic';

describe('preloadDynamic util', () => {
  describe('paramsHaveChanged()', () => {
    test('returns true when nextParams is undefined', () => {
      expect(paramsHaveChanged(undefined, undefined)).toBeTruthy();
    });

    test('returns true when params and nextParams are different', () => {
      const params = {foo: 'bar', foo2: 'bar3'};
      const nextParams = {foo: 'bar', foo2: 'bar2'};
      expect(paramsHaveChanged(params, nextParams)).toBeTruthy();
    });

    test('returns false when params and nextParams are the same', () => {
      const params = {foo: 'bar', foo2: 'bar2'};
      const nextParams = {foo2: 'bar2', foo: 'bar'};
      expect(paramsHaveChanged(params, nextParams)).toBeFalsy();
    });
  });

  describe('preloadDynamic()', () => {
    const action1Spy = jest.fn().mockImplementation(() => {});
    const action2Spy = jest.fn().mockImplementation(() => {});
    const action1Args = 'action1 args';
    const action2Args = 'action1 args';
    const mockActions = [
      {
        action: action1Spy,
        args: action1Args
      },
      {
        action: action2Spy,
        args: action2Args
      }
    ];

    describe('when in a browser environment', () => {
      describe('when this is the first request after server load', () => {
        test('will reset window.__INITIAL_STATE__ and will not execute ' +
             'input actions', () => {
           action1Spy.mockClear();
           action2Spy.mockClear();
           global.window.__INITIAL_STATE__ = true;
           preloadDynamic(mockActions);
           expect(global.window.__INITIAL_STATE__).toEqual(null);
           expect(action1Spy).toHaveBeenCalledTimes(0);
           expect(action2Spy).toHaveBeenCalledTimes(0);
        });
      });

      describe('when this is not the first request after server load', () => {
        test('will execute input actions', () => {
          action1Spy.mockClear();
          action2Spy.mockClear();
          global.window.__INITIAL_STATE__ = null;
          preloadDynamic(mockActions);
          expect(action1Spy).toHaveBeenCalledWith(action1Args);
          expect(action2Spy).toHaveBeenCalledWith(action2Args);
          expect(action1Spy).toHaveBeenCalledTimes(1);
          expect(action2Spy).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('when not in a browser environment', () => {
      test('will not execute input actions', () => {
        action1Spy.mockClear();
        action2Spy.mockClear();
        global.window.__INITIAL_STATE__ = undefined;
        preloadDynamic(mockActions);
        expect(action1Spy).toHaveBeenCalledTimes(0);
        expect(action2Spy).toHaveBeenCalledTimes(0);
      });
    });
  });
});
