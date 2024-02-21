import { formatYYYYMMDD } from '.';

test('YYYYMMDD形式で返されること', () => {
  expect(formatYYYYMMDD(new Date(2021, 0, 1))).toBe('2021/01/01');
});
