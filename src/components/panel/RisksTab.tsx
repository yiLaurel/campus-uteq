import { Building, Risk, RiskLevel } from '../../types';
import { AlertTriangle, ShieldCheck, Siren, ChevronDown, ChevronUp, ShieldOff } from 'lucide-react';
import { useState } from 'react';

interface Props {
  building: Building;
}

const RISK_CONFIG: Record<RiskLevel, { label: string; textColor: string; bg: string; border: string; dot: string; iconColor: string }> = {
  high:   { label: 'Alto',  textColor: 'text-red-300',    bg: 'bg-red-950/40',    border: 'border-red-800/50',    dot: 'bg-red-500',     iconColor: 'text-red-400' },
  medium: { label: 'Medio', textColor: 'text-amber-300',  bg: 'bg-amber-950/40',  border: 'border-amber-800/50',  dot: 'bg-amber-500',   iconColor: 'text-amber-400' },
  low:    { label: 'Bajo',  textColor: 'text-emerald-300', bg: 'bg-emerald-950/40', border: 'border-emerald-800/50', dot: 'bg-emerald-500', iconColor: 'text-emerald-400' },
  '':     { label: '--',    textColor: 'text-slate-400',  bg: 'bg-slate-900',     border: 'border-slate-700',     dot: 'bg-slate-500',   iconColor: 'text-slate-500' },
};

function RiskCard({ risk, index }: { risk: Risk; index: number }) {
  const [open, setOpen] = useState(false);
  const cfg = RISK_CONFIG[risk.level];

  return (
    <div
      className={`rounded-xl border overflow-hidden mb-2.5 transition-all duration-200 ${cfg.bg} ${cfg.border}`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <button
        className="w-full flex items-center gap-3 p-3.5 text-left hover:brightness-110 transition-all"
        onClick={() => setOpen(!open)}
      >
        {/* Level dot */}
        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />

        {/* Name */}
        <span className="flex-1 text-slate-100 font-semibold text-sm truncate min-w-0">
          {risk.name || <span className="italic text-slate-500 font-normal">Sin nombre</span>}
        </span>

        {/* Badge + toggle */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${cfg.textColor} ${cfg.border} bg-black/20`}>
            {cfg.label}
          </span>
          {open
            ? <ChevronUp size={13} className="text-slate-500" />
            : <ChevronDown size={13} className="text-slate-500" />
          }
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 pt-2 space-y-4 border-t border-white/5 animate-fade-in">
          <InfoBlock label="Descripción" value={risk.description} />
          <InfoBlock
            label="Medidas de Prevención"
            value={risk.preventionMeasures}
            icon={<ShieldCheck size={12} className="text-sky-400" />}
          />
          <InfoBlock
            label="Procedimientos de Emergencia"
            value={risk.emergencyProcedures}
            icon={<Siren size={12} className="text-amber-400" />}
          />
        </div>
      )}
    </div>
  );
}

function InfoBlock({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  const empty = !value || value === '--';
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1.5">
        {icon}
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{label}</span>
      </div>
      <p className={`text-xs leading-relaxed ${empty ? 'italic text-slate-600' : 'text-slate-200'}`}>
        {empty ? 'Sin información registrada' : value}
      </p>
    </div>
  );
}

export default function RisksTab({ building }: Props) {
  const { risks } = building;
  const highCount   = risks.filter(r => r.level === 'high').length;
  const medCount    = risks.filter(r => r.level === 'medium').length;
  const lowCount    = risks.filter(r => r.level === 'low').length;

  if (risks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center px-4">
        <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-4">
          <ShieldOff size={24} className="text-slate-600" />
        </div>
        <p className="text-slate-300 font-semibold mb-1.5">Sin riesgos registrados</p>
        <p className="text-slate-600 text-xs leading-relaxed max-w-[200px]">
          Agrega riesgos en <code className="text-slate-500">buildings.ts</code> bajo el edificio <code className="text-slate-500">"{building.id}"</code>
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { count: highCount, label: 'Alto', color: 'text-red-400', bg: 'bg-red-900/20 border-red-800/40' },
          { count: medCount,  label: 'Medio', color: 'text-amber-400', bg: 'bg-amber-900/20 border-amber-800/40' },
          { count: lowCount,  label: 'Bajo', color: 'text-emerald-400', bg: 'bg-emerald-900/20 border-emerald-800/40' },
        ].map(({ count, label, color, bg }) => (
          <div key={label} className={`rounded-xl border p-2.5 text-center ${bg}`}>
            <p className={`text-xl font-bold leading-none ${color}`}>{count}</p>
            <p className="text-slate-500 text-[10px] mt-1 font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* Risk cards */}
      {risks.map((risk, i) => (
        <RiskCard key={risk.id} risk={risk} index={i} />
      ))}
    </div>
  );
}
