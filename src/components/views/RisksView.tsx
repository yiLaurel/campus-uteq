import { buildings } from '../../data/buildings';
import { Building } from '../../types';
import { AlertTriangle, ShieldOff, TrendingUp, Activity } from 'lucide-react';

interface Props {
  searchQuery: string;
  onSelectBuilding: (b: Building) => void;
}

const LEVEL_CONFIG = {
  high:   { label: 'Alto',  textColor: 'text-red-400',     bg: 'bg-red-950/50',     border: 'border-red-800/50',     dot: 'bg-red-500',     barColor: 'bg-red-500' },
  medium: { label: 'Medio', textColor: 'text-amber-400',   bg: 'bg-amber-950/50',   border: 'border-amber-800/50',   dot: 'bg-amber-500',   barColor: 'bg-amber-500' },
  low:    { label: 'Bajo',  textColor: 'text-emerald-400', bg: 'bg-emerald-950/50', border: 'border-emerald-800/50', dot: 'bg-emerald-500', barColor: 'bg-emerald-500' },
};

export default function RisksView({ searchQuery, onSelectBuilding }: Props) {
  const allRisks = buildings.flatMap(b =>
    b.risks.map(r => ({ ...r, building: b }))
  );

  const filtered = allRisks.filter(r =>
    !searchQuery ||
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.building.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const highCount   = allRisks.filter(r => r.level === 'high').length;
  const medCount    = allRisks.filter(r => r.level === 'medium').length;
  const lowCount    = allRisks.filter(r => r.level === 'low').length;
  const total       = allRisks.length;

  const buildingsWithRisks = buildings.filter(b => b.risks.length > 0).length;

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-slate-950">
      {/* Page header */}
      <div className="mb-6">
        <h2 className="text-white font-bold text-xl mb-1">Análisis de Riesgos</h2>
        <p className="text-slate-500 text-sm">
          {total} riesgo{total !== 1 ? 's' : ''} registrado{total !== 1 ? 's' : ''} en {buildingsWithRisks} área{buildingsWithRisks !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total',       value: total,      color: 'text-slate-300', bg: 'bg-slate-800/60 border-slate-700/50' },
          { label: 'Alto',        value: highCount,  color: 'text-red-400',    bg: 'bg-red-900/20 border-red-800/40' },
          { label: 'Medio',       value: medCount,   color: 'text-amber-400',  bg: 'bg-amber-900/20 border-amber-800/40' },
          { label: 'Bajo',        value: lowCount,   color: 'text-emerald-400',bg: 'bg-emerald-900/20 border-emerald-800/40' },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`rounded-xl border p-4 ${bg}`}>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-slate-500 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Distribution bar */}
      {total > 0 && (
        <div className="card p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={14} className="text-slate-400" />
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-widest">Distribución</span>
          </div>
          <div className="flex rounded-full overflow-hidden h-2.5 mb-3 bg-slate-800">
            {highCount  > 0 && <div className="bg-red-500 transition-all"    style={{ width: `${(highCount  / total) * 100}%` }} />}
            {medCount   > 0 && <div className="bg-amber-500 transition-all"  style={{ width: `${(medCount   / total) * 100}%` }} />}
            {lowCount   > 0 && <div className="bg-emerald-500 transition-all" style={{ width: `${(lowCount   / total) * 100}%` }} />}
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-red-500" />{Math.round((highCount / total) * 100)}% Alto</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-amber-500" />{Math.round((medCount / total) * 100)}% Medio</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-emerald-500" />{Math.round((lowCount / total) * 100)}% Bajo</span>
          </div>
        </div>
      )}

      {/* Risk list */}
      {total === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-4">
            <ShieldOff size={28} className="text-slate-600" />
          </div>
          <p className="text-slate-400 font-semibold mb-2">Sin riesgos registrados</p>
          <p className="text-slate-600 text-sm max-w-xs leading-relaxed">
            Agrega riesgos en <code className="text-slate-500">src/data/buildings.ts</code> dentro de cada edificio.
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <AlertTriangle size={28} className="text-slate-700 mb-3" />
          <p className="text-slate-400 font-semibold mb-1">Sin coincidencias</p>
          <p className="text-slate-600 text-sm">No se encontraron riesgos para "{searchQuery}"</p>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={14} className="text-slate-500" />
            <span className="text-slate-500 text-xs">{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="space-y-2">
            {filtered.map((risk, i) => {
              const cfg = LEVEL_CONFIG[risk.level as 'high' | 'medium' | 'low'] ?? LEVEL_CONFIG.low;
              return (
                <div
                  key={`${risk.id}-${i}`}
                  className={`rounded-xl border p-4 cursor-pointer transition-all duration-200 hover:brightness-110 animate-fade-in ${cfg.bg} ${cfg.border}`}
                  style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}
                  onClick={() => onSelectBuilding(risk.building)}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${cfg.dot}`} />
                      <div className="min-w-0">
                        <p className="text-slate-100 font-semibold text-sm truncate">
                          {risk.name || <span className="italic text-slate-500 font-normal">Sin nombre</span>}
                        </p>
                        <p className="text-slate-500 text-xs mt-0.5">{risk.building.name}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border flex-shrink-0 ${cfg.textColor} ${cfg.border} bg-black/20`}>
                      {cfg.label}
                    </span>
                  </div>
                  {risk.description && risk.description !== '--' && (
                    <p className="text-slate-400 text-xs leading-relaxed truncate ml-4.5 pl-0.5">
                      {risk.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
