import { format } from 'date-fns';

export const formatYYYYMMDD = (date: Date): string => {
  return format(date, 'yyyy/MM/dd');
};
