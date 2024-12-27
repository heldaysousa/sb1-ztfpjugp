import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DATE_RANGES } from './constants';

export function getDateRangeFilter(range: string) {
  const today = new Date();

  switch (range) {
    case DATE_RANGES.TODAY:
      return {
        startDate: format(startOfDay(today), 'yyyy-MM-dd'),
        endDate: format(endOfDay(today), 'yyyy-MM-dd')
      };
    case DATE_RANGES.WEEK:
      return {
        startDate: format(startOfWeek(today, { locale: ptBR }), 'yyyy-MM-dd'),
        endDate: format(endOfWeek(today, { locale: ptBR }), 'yyyy-MM-dd')
      };
    case DATE_RANGES.MONTH:
      return {
        startDate: format(startOfMonth(today), 'yyyy-MM-dd'),
        endDate: format(endOfMonth(today), 'yyyy-MM-dd')
      };
    default:
      return {
        startDate: format(today, 'yyyy-MM-dd'),
        endDate: format(today, 'yyyy-MM-dd')
      };
  }
}