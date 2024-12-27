export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense'
} as const;

export const DATE_RANGES = {
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  CUSTOM: 'custom'
} as const;

export const INITIAL_FILTER = {
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date().toISOString().split('T')[0],
  type: 'all',
  dateRange: DATE_RANGES.TODAY
};