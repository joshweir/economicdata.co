import { formatReleaseDate, formatReleaseTime } from '../dateFormatting';

describe('dateFormatting util', () => {
  describe('formatReleaseDate()', () => {
    test('formats the date as Mon DD, YYYY', () => {
      const dt = new Date('2005-01-22T14:00:00.000Z');
      expect(formatReleaseDate(dt)).toEqual('Jan 22, 2005');
    });
  });

  describe('formatReleaseTime()', () => {
    test('formats the date as a time HH:MM', () => {
      const dt = new Date('2005-11-22T14:22:23.000Z');
      expect(formatReleaseTime(dt)).toEqual('14:22');
    });

    test('enforces 2 digits for hours', () => {
      const dt = new Date('2005-11-22T09:22:23.000Z');
      expect(formatReleaseTime(dt)).toEqual('09:22');
    });

    test('enforces 2 digits for minutes', () => {
      const dt = new Date('2005-11-22T14:00:23.000Z');
      expect(formatReleaseTime(dt)).toEqual('14:00');
    });
  });
});
