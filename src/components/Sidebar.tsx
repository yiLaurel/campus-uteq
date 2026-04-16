import { NavView } from '../types';
import { Map, Building2, AlertTriangle, FileText, ShieldAlert, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { buildings } from '../data/buildings';

interface Props {
  activeView: NavView;
  onViewChange: (view: NavView) => void;
}

const NAV_ITEMS: { view: NavView; icon: React.ReactNode; label: string; sublabel: string }[] = [
  { view: 'map',       icon: <Map size={18} />,           label: 'Mapa',        sublabel: 'Campus interactivo' },
  { view: 'buildings', icon: <Building2 size={18} />,     label: 'Edificios',   sublabel: 'Directorio' },
  { view: 'risks',     icon: <AlertTriangle size={18} />, label: 'Riesgos',     sublabel: 'Análisis' },
  { view: 'norms',     icon: <FileText size={18} />,      label: 'Normativas',  sublabel: 'NOM y documentos' },
];

export default function Sidebar({ activeView, onViewChange }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  const totalRisks = buildings.reduce((a, b) => a + b.risks.length, 0);
  const highRisks = buildings.reduce((a, b) => a + b.risks.filter(r => r.level === 'high').length, 0);

  return (
    <aside
      className={`flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-300 ease-in-out flex-shrink-0 ${collapsed ? 'w-[72px]' : 'w-56'}`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-4 border-b border-slate-800 min-h-[64px] ${collapsed ? 'justify-center px-0' : ''}`}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center flex-shrink-0 shadow-lg shadow-sky-900/40">
          <ShieldAlert size={16} className="text-white" />
        </div>
        {!collapsed && (
          <div className="min-w-0 animate-fade-in">
            <p className="text-white font-bold text-sm leading-tight">GRC Campus</p>
            <p className="text-slate-500 text-[10px] leading-tight mt-0.5 font-medium uppercase tracking-wider">UTEQ</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {!collapsed && (
          <p className="text-slate-600 text-[10px] font-semibold uppercase tracking-widest px-3 pt-2 pb-1">
            Navegación
          </p>
        )}

        {NAV_ITEMS.map(({ view, icon, label, sublabel }) => {
          const isActive = activeView === view;
          return (
            <button
              key={view}
              onClick={() => onViewChange(view)}
              title={collapsed ? label : undefined}
              className={`w-full flex items-center gap-3 rounded-lg transition-all duration-150 group
                ${collapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5'}
                ${isActive
                  ? 'bg-sky-600/15 text-sky-400 border border-sky-600/25 shadow-sm'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800 border border-transparent'
                }`}
            >
              <span className={`flex-shrink-0 transition-transform duration-150 ${isActive ? '' : 'group-hover:scale-110'}`}>
                {icon}
              </span>
              {!collapsed && (
                <div className="min-w-0 text-left animate-fade-in">
                  <p className="text-sm font-medium leading-tight">{label}</p>
                  <p className={`text-[10px] leading-tight mt-0.5 ${isActive ? 'text-sky-500/70' : 'text-slate-600'}`}>
                    {sublabel}
                  </p>
                </div>
              )}
              {isActive && !collapsed && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Stats strip */}
      {!collapsed && (
        <div className="p-3 border-t border-slate-800 animate-fade-in">
          <div className="card p-3 space-y-2">
            <p className="text-slate-600 text-[10px] font-semibold uppercase tracking-widest">Resumen</p>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Edificios</span>
              <span className="text-slate-200 font-semibold">{buildings.length}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Riesgos</span>
              <span className="text-slate-200 font-semibold">{totalRisks}</span>
            </div>
            {highRisks > 0 && (
              <div className="flex justify-between text-xs">
                <span className="text-red-400">Riesgo alto</span>
                <span className="text-red-400 font-semibold">{highRisks}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center py-3 border-t border-slate-800 text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 transition-colors duration-150"
        title={collapsed ? 'Expandir' : 'Colapsar'}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
}
