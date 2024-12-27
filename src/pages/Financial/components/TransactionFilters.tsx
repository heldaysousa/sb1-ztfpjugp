import React from 'react';
import { Filter, Download, Calendar } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { DATE_RANGES } from '../utils/constants';
import { getDateRangeFilter } from '../utils/dates';

interface TransactionFiltersProps {
  filter: {
    startDate: string;
    endDate: string;
    type: string;
    dateRange: string;
  };
  onFilterChange: (filter: any) => void;
}

export function TransactionFilters({ filter, onFilterChange }: TransactionFiltersProps) {
  const handleDateRangeChange = (range: string) => {
    const dates = getDateRangeFilter(range);
    onFilterChange({
      ...filter,
      ...dates,
      dateRange: range
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button 
            variant={filter.dateRange === DATE_RANGES.TODAY ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => handleDateRangeChange(DATE_RANGES.TODAY)}
          >
            Hoje
          </Button>
          <Button 
            variant={filter.dateRange === DATE_RANGES.WEEK ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => handleDateRangeChange(DATE_RANGES.WEEK)}
          >
            Esta Semana
          </Button>
          <Button 
            variant={filter.dateRange === DATE_RANGES.MONTH ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => handleDateRangeChange(DATE_RANGES.MONTH)}
          >
            Este Mês
          </Button>
          <Button 
            variant={filter.dateRange === DATE_RANGES.CUSTOM ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => handleDateRangeChange(DATE_RANGES.CUSTOM)}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Personalizado
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {filter.dateRange === DATE_RANGES.CUSTOM && (
        <div className="flex space-x-4">
          <input
            type="date"
            value={filter.startDate}
            onChange={(e) => onFilterChange({ ...filter, startDate: e.target.value })}
            className="rounded-md border-gray-300"
          />
          <input
            type="date"
            value={filter.endDate}
            onChange={(e) => onFilterChange({ ...filter, endDate: e.target.value })}
            className="rounded-md border-gray-300"
          />
        </div>
      )}

      <div className="flex space-x-4">
        <select
          value={filter.type}
          onChange={(e) => onFilterChange({ ...filter, type: e.target.value })}
          className="rounded-md border-gray-300"
        >
          <option value="all">Todas</option>
          <option value="income">Receitas</option>
          <option value="expense">Despesas</option>
        </select>
      </div>
    </div>
  );
}