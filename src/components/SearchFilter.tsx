// ============================================================
// COMPONENTE: SearchFilter
// Barra de búsqueda y filtros por nivel de riesgo.
// La búsqueda filtra por nombre de edificio en tiempo real.
// ============================================================

import { Search, Filter, X } from 'lucide-react';
import { RiskLevel } from '../types';

interface Props {
  query: string;
  onQueryChange: (q: string) => void;
  riskFilter: RiskLevel | 'all';
  onRiskFilterChange: (level: RiskLevel | 'all') => void;
}

const RISK_FILTERS: { value: RiskLevel | 'all'; label: string; color: string; activeColor: string }[] = [
  { value: 'all', label: 'Todos', color: 'text-slate-400', activeColor: 'bg-slate-600 text-white' },
  { value: 'low', label: 'Bajo', color: 'text-green-400', activeColor: 'bg-green-700 text-white' },
  { value: 'medium', label: 'Medio', color: 'text-yellow-400', activeColor: 'bg-yellow-700 text-white' },
  { value: 'high', label: 'Alto', color: 'text-red-400', activeColor: 'bg-red-700 text-white' },
];

export default function SearchFilter({ query, onQueryChange, riskFilter, onRiskFilterChange }: Props) {
  return (
    <div className="bg-slate-800 border-b border-slate-700 px-4 py-2.5 flex items-center gap-3 flex-wrap">
      {/* Campo de búsqueda */}
      <div className="relative flex-1 min-w-40">
        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar edificio o área..."
          className="w-full bg-slate-700 border border-slate-600 text-slate-100 text-sm rounded-lg pl-8 pr-8 py-1.5 focus:outline-none focus:border-sky-500 placeholder-slate-500 transition-colors"
        />
        {query && (
          <button
            onClick={() => onQueryChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Filtros de nivel de riesgo */}
      <div className="flex items-center gap-1.5">
        <Filter size={13} className="text-slate-500 flex-shrink-0" />
        {RISK_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => onRiskFilterChange(f.value)}
            className={`text-xs px-2.5 py-1 rounded-md border transition-all font-medium
              ${riskFilter === f.value
                ? `${f.activeColor} border-transparent shadow-sm`
                : `${f.color} border-slate-600 bg-slate-700/50 hover:bg-slate-700`
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
