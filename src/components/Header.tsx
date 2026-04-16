import { buildings } from '../data/buildings';
import { Search, Bell, X } from 'lucide-react';

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchFocus?: () => void;
}

export default function Header({ searchQuery, onSearchChange, onSearchFocus }: Props) {
  const totalBuildings = buildings.length;
  const buildingsWithRisks = buildings.filter(b => b.risks.length > 0).length;
  const highRiskCount = buildings.reduce((acc, b) => acc + b.risks.filter(r => r.level === 'high').length, 0);

  return (
    <header className="h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 gap-4 flex-shrink-0">
      {/* Title */}
      <div className="hidden md:flex flex-col min-w-0">
        <h1 className="text-white font-bold text-sm leading-tight">
          Sistema de Gestión de Riesgos
        </h1>
        <p className="text-slate-500 text-xs mt-0.5">Universidad Tecnológica de Querétaro</p>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            onFocus={onSearchFocus}
            placeholder="Buscar edificio, área o riesgo..."
            className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-sm rounded-lg pl-9 pr-8 py-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/30 placeholder-slate-600 transition-all duration-150"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 transition-colors"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Stats + notifications */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="hidden lg:flex items-center gap-2">
          <StatPill value={totalBuildings} label="Áreas" color="sky" />
          <StatPill value={buildingsWithRisks} label="Con riesgos" color="amber" />
          {highRiskCount > 0 && <StatPill value={highRiskCount} label="Alto" color="red" />}
        </div>

        <div className="relative">
          <button className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-all duration-150">
            <Bell size={14} />
          </button>
          {highRiskCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-950 animate-pulse-slow" />
          )}
        </div>
      </div>
    </header>
  );
}

function StatPill({ value, label, color }: { value: number; label: string; color: 'sky' | 'amber' | 'red' }) {
  const colors = {
    sky: 'bg-sky-900/30 text-sky-400 border-sky-700/40',
    amber: 'bg-amber-900/30 text-amber-400 border-amber-700/40',
    red: 'bg-red-900/30 text-red-400 border-red-700/40',
  };
  return (
    <div className={`flex items-center gap-1.5 text-xs font-medium border rounded-lg px-2.5 py-1.5 ${colors[color]}`}>
      <span className="font-bold">{value}</span>
      <span className="opacity-70">{label}</span>
    </div>
  );
}
