export function formatValue(value: number | string): string {
  if (typeof value === 'number') {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }
  return value.toString();
}