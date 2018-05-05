import { fork, join } from 'redux-saga/effects';
import genTasks from '../waitAll';

jest.mock('redux-saga/effects');

describe('*genTasks()', () => {
  beforeAll(() => {
    fork.mockImplementation((saga, ...params) => [saga, ...params]);
    join.mockImplementation(() => {});
  });

  describe('when sagas exist', () => {
    test('forks each saga and joins', () => {
      const sagas = [
        ['saga1', 'saga1_param1', 'saga1_param2'],
        ['saga2', 'saga2_param1']
      ];
      const subjectWrapper = genTasks(sagas);
      const subject = subjectWrapper();
      const iteration1 = subject.next();
      expect(iteration1.value).toEqual(sagas);
      expect(iteration1.done).toBeFalsy();
      const iteration2 = subject.next(sagas);
      expect(iteration2.done).toBeFalsy();
      expect(subject.next().done).toBeTruthy();
      expect(fork.mock.calls).toEqual(sagas);
      expect(join.mock.calls).toEqual([sagas]);
    });
  });

  describe('when sagas do not exist', () => {
    test('no sagas forked, join is not yielded', () => {
      fork.mockReset();
      join.mockReset();
      const sagas = [];
      const subjectWrapper = genTasks(sagas);
      const subject = subjectWrapper();
      const iteration1 = subject.next();
      expect(iteration1.value).toEqual(sagas);
      expect(iteration1.done).toBeFalsy();
      const iteration2 = subject.next(sagas);
      expect(iteration2.done).toBeTruthy();
      expect(fork).not.toHaveBeenCalled();
      expect(join).not.toHaveBeenCalled();
    });
  });
});
