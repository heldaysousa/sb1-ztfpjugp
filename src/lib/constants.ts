// Add new route
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  APPOINTMENTS: '/agenda',
  CLIENTS: '/clientes',
  FINANCIAL: '/financeiro',
  SERVICES: '/servicos',
  SETTINGS: '/configuracoes'
} as const;

export const DATE_FORMAT = 'dd/MM/yyyy';
export const TIME_FORMAT = 'HH:mm';
export const CURRENCY_FORMAT = 'BRL';

export const STATUS_COLORS = {
  scheduled: 'blue',
  completed: 'green',
  cancelled: 'red'
} as const;