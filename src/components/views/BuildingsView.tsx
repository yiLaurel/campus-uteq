import { Building } from '../../types';
import { buildings } from '../../data/buildings';
import { Building2, AlertTriangle, Image, FileText, ChevronRight } from 'lucide-react';

interface Props {
  searchQuery: string;
  onSelectBuilding: (b: Building) => void;
  onGoToMap: (b: Building) => void;
}

function RiskDot({ level }: { level: 'high' | 'medium' | 'low' }) {
  const colors = { high: 'bg-red-500', medium: 'bg-amber-500', low: 'bg-emerald-500' };
  return <span className={`w-1.5 h-1.5 rounded-full ${colors[level]}`} />;
}

function BuildingCard({ building, onSelect, onGoToMap }: { building: Building; onSelect: () => void; onGoToMap: () => void }) {
  const highCount   = building.risks.filter(r => r.level === 'high').length;
  const medCount    = building.risks.filter(r => r.level === 'medium').length;
  const lowCount    = building.risks.filter(r => r.level === 'low').length;

  const worstLevel = highCount > 0 ? 'high' : medCount > 0 ? 'medium' : lowCount > 0 ? 'low' : null;

  const borderAccent = worstLevel === 'high'
    ? 'hover:border-red-700/60'
    : worstLevel === 'medium'
    ? 'hover:border-amber-700/60'
    : worstLevel === 'low'
    ? 'hover:border-emerald-700/60'
    : 'hover:border-slate-600';

  return (
    <div
      className={`card p-4 cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-black/30 ${borderAccent} group animate-fade-in`}
      onClick={onSelect}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 group-hover:border-sky-600/40 group-hover:bg-sky-900/20 transition-colors">
            <Building2 size={15} className="text-slate-400 group-hover:text-sky-400 transition-colors" />
          </div>
          <div className="min-w-0">
            <h3 className="text-slate-100 font-semibold text-sm leading-tight truncate">{building.name}</h3>
            <p className="text-slate-600 text-[10px] font-mono mt-0.5">{building.id}</p>
          </div>
        </div>
        {worstLevel && <RiskDot level={worstLevel} />}
      </div>

      {/* Risk summary */}
      <div className="flex items-center gap-1.5 mb-3 flex-wrap">
        {highCount > 0 && (
          <span className="badge-risk-high">{highCount} Alto</span>
        )}
        {medCount > 0 && (
          <span className="badge-risk-medium">{medCount} Medio</span>
        )}
        {lowCount > 0 && (
          <span className="badge-risk-low">{lowCount} Bajo</span>
        )}
        {building.risks.length === 0 && (
          <span className="badge-risk-none">Sin riesgos</span>
        )}
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-3 text-xs text-slate-500 border-t border-slate-800 pt-3">
        <span className="flex items-center gap-1">
          <AlertTriangle size={11} />
          {building.risks.length} riesgo{building.risks.length !== 1 ? 's' : ''}
        </span>
        <span className="flex items-center gap-1">
          <Image size={11} />
          {building.images.length} fotos
        </span>
        <span className="flex items-center gap-1">
          <FileText size={11} />
          {building.norms.length} NOM
        </span>

        <button
          onClick={e => { e.stopPropagation(); onGoToMap(); }}
          className="ml-auto flex items-center gap-1 text-sky-500 hover:text-sky-400 transition-colors text-[10px] font-medium"
        >
          Ver en mapa <ChevronRight size={10} />
        </button>
      </div>
    </div>
  );
}

export default function BuildingsView({ searchQuery, onSelectBuilding, onGoToMap }: Props) {
  const filtered = buildings.filter(b =>
    !searchQuery ||
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-slate-950">
      {/* Page header */}
      <div className="mb-6">
        <h2 className="text-white font-bold text-xl mb-1">Edificios y Áreas</h2>
        <p className="text-slate-500 text-sm">
          {filtered.length} de {buildings.length} área{buildings.length !== 1 ? 's' : ''} del campus
          {searchQuery && <span className="text-sky-400 ml-1">— filtrando por "{searchQuery}"</span>}
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total áreas',    value: buildings.length,    color: 'text-sky-400',     bg: 'bg-sky-900/20 border-sky-800/40' },
          { label: 'Con riesgos',    value: buildings.filter(b => b.risks.length > 0).length, color: 'text-amber-400', bg: 'bg-amber-900/20 border-amber-800/40' },
          { label: 'Riesgo alto',    value: buildings.reduce((a, b) => a + b.risks.filter(r => r.level === 'high').length, 0), color: 'text-red-400', bg: 'bg-red-900/20 border-red-800/40' },
          { label: 'Sin riesgos',    value: buildings.filter(b => b.risks.length === 0).length, color: 'text-emerald-400', bg: 'bg-emerald-900/20 border-emerald-800/40' },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`rounded-xl border p-4 ${bg}`}>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-slate-500 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map(b => (
            <BuildingCard
              key={b.id}
              building={b}
              onSelect={() => onSelectBuilding(b)}
              onGoToMap={() => onGoToMap(b)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Building2 size={40} className="text-slate-700 mb-4" />
          <p className="text-slate-400 font-semibold mb-1">Sin resultados</p>
          <p className="text-slate-600 text-sm">No se encontraron edificios que coincidan con "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}
