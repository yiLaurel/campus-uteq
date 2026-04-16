import { Building, TabType } from '../../types';
import InfoTab from './InfoTab';
import RisksTab from './RisksTab';
import GalleryTab from './GalleryTab';
import NormsTab from './NormsTab';
import { X, Info, AlertTriangle, Image, FileText, Building2, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface Props {
  building: Building;
  onClose: () => void;
}

const TABS: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: 'info',    label: 'Info',    icon: <Info size={13} /> },
  { id: 'risks',   label: 'Riesgos', icon: <AlertTriangle size={13} /> },
  { id: 'gallery', label: 'Galería', icon: <Image size={13} /> },
  { id: 'norms',   label: 'NOM',     icon: <FileText size={13} /> },
];

function RiskSummaryDot({ level, count }: { level: 'high' | 'medium' | 'low'; count: number }) {
  if (count === 0) return null;
  const styles = {
    high:   'bg-red-900/40 text-red-400 border-red-700/40',
    medium: 'bg-amber-900/40 text-amber-400 border-amber-700/40',
    low:    'bg-emerald-900/40 text-emerald-400 border-emerald-700/40',
  };
  const labels = { high: 'Alto', medium: 'Medio', low: 'Bajo' };
  return (
    <span className={`text-[10px] font-semibold border rounded-full px-2 py-0.5 ${styles[level]}`}>
      {count} {labels[level]}
    </span>
  );
}

export default function BuildingPanel({ building, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('info');

  const highCount   = building.risks.filter(r => r.level === 'high').length;
  const medCount    = building.risks.filter(r => r.level === 'medium').length;
  const lowCount    = building.risks.filter(r => r.level === 'low').length;
  const totalRisks  = building.risks.length;

  return (
    <div className="flex flex-col h-full bg-slate-950 border-l border-slate-800 animate-slide-right">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-950/50 to-slate-900" />
        <div className="relative px-4 pt-4 pb-3">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-sky-600/20 border border-sky-600/30 flex items-center justify-center flex-shrink-0">
                <Building2 size={18} className="text-sky-400" />
              </div>
              <div className="min-w-0">
                <h2 className="text-white font-bold text-base leading-tight truncate">{building.name}</h2>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-slate-500 text-xs font-mono">{building.id}</span>
                  <ChevronRight size={10} className="text-slate-600" />
                  <span className="text-slate-500 text-xs">{totalRisks} riesgo{totalRisks !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-200 hover:bg-slate-700/60 transition-all flex-shrink-0"
            >
              <X size={14} />
            </button>
          </div>

          {/* Risk badges */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <RiskSummaryDot level="high" count={highCount} />
            <RiskSummaryDot level="medium" count={medCount} />
            <RiskSummaryDot level="low" count={lowCount} />
            {totalRisks === 0 && (
              <span className="text-[10px] text-slate-600 italic">Sin riesgos registrados</span>
            )}
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex border-t border-slate-800">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-150 border-b-2 cursor-pointer
                ${activeTab === tab.id
                  ? 'text-sky-400 border-sky-500 bg-sky-950/30'
                  : 'text-slate-500 border-transparent hover:text-slate-300 hover:bg-slate-800/30'
                }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div key={activeTab} className="animate-fade-in">
          {activeTab === 'info'    && <InfoTab building={building} />}
          {activeTab === 'risks'   && <RisksTab building={building} />}
          {activeTab === 'gallery' && <GalleryTab building={building} />}
          {activeTab === 'norms'   && <NormsTab building={building} />}
        </div>
      </div>
    </div>
  );
}
