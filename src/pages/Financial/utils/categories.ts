export const TRANSACTION_CATEGORIES = {
  income: [
    { id: 'services', label: 'Serviços' },
    { id: 'products', label: 'Produtos' },
    { id: 'others', label: 'Outros' }
  ],
  expense: [
    { id: 'products', label: 'Produtos' },
    { id: 'rent', label: 'Aluguel' },
    { id: 'salaries', label: 'Salários' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'materials', label: 'Materiais' },
    { id: 'others', label: 'Outros' }
  ]
};

export function getCategoryLabel(type: 'income' | 'expense', categoryId: string): string {
  const category = TRANSACTION_CATEGORIES[type].find(cat => cat.id === categoryId);
  return category?.label || categoryId;
}