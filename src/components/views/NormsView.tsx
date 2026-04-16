import { buildings } from '../../data/buildings';
import { Building } from '../../types';
import { FileText, ExternalLink, FilePlus2, BookOpen } from 'lucide-react';

interface Props {
  searchQuery: string;
  onSelectBuilding: (b: Building) => void;
}

export default function NormsView({ searchQuery, onSelectBuilding }: Props) {
  const allNorms = buildings.flatMap(b =>
    b.norms.map(n => ({ ...n, building: b }))
  );

  const filtered = allNorms.filter(n =>
    !searchQuery ||
    n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.building.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-slate-950">
      {/* Page header */}
      <div className="mb-6">
        <h2 className="text-white font-bold text-xl mb-1">Normativas y Documentos</h2>
        <p className="text-slate-500 text-sm">
          {allNorms.length} documento{allNorms.length !== 1 ? 's' : ''} registrado{allNorms.length !== 1 ? 's' : ''} en el campus
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Documentos totales', value: allNorms.length,  color: 'text-sky-400',     bg: 'bg-sky-900/20 border-sky-800/40' },
          { label: 'Edificios cubiertos', value: buildings.filter(b => b.norms.length > 0).length, color: 'text-slate-300', bg: 'bg-slate-800/60 border-slate-700/50' },
          { label: 'Sin documentar',     value: buildings.filter(b => b.norms.length === 0).length, color: 'text-amber-400', bg: 'bg-amber-900/20 border-amber-800/40' },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`rounded-xl border p-4 ${bg}`}>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-slate-500 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Content */}
      {allNorms.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-4">
            <FilePlus2 size={28} className="text-slate-600" />
          </div>
          <p className="text-slate-400 font-semibold mb-2">Sin normativas registradas</p>
          <p className="text-slate-600 text-sm max-w-xs leading-relaxed">
            Agrega documentos en <code className="text-slate-500">src/data/buildings.ts</code> en el campo <code className="text-slate-500">norms</code> de cada edificio.
          </p>

          {/* Template preview */}
          <div className="mt-6 w-full max-w-xs text-left bg-slate-900 border border-dashed border-slate-700 rounded-xl p-4 opacity-50">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={13} className="text-slate-500" />
              <span className="text-slate-500 text-xs font-mono">Estructura de normativa</span>
            </div>
            <div className="space-y-1 text-xs font-mono text-slate-600">
              <p><span className="text-slate-500">id:</span> 'nom-001'</p>
              <p><span className="text-slate-500">name:</span> 'NOM-002-STPS'</p>
              <p><span className="text-slate-500">description:</span> '--'</p>
              <p><span className="text-slate-500">fileOrLink:</span> '--'</p>
            </div>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <FileText size={28} className="text-slate-700 mb-3" />
          <p className="text-slate-400 font-semibold mb-1">Sin coincidencias</p>
          <p className="text-slate-600 text-sm">No se encontraron documentos para "{searchQuery}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((norm, i) => {
            const hasFile = norm.fileOrLink && norm.fileOrLink !== '--';
            return (
              <div
                key={`${norm.id}-${i}`}
                className="card p-4 cursor-pointer hover:border-slate-600 hover:shadow-lg hover:shadow-black/30 transition-all duration-200 animate-fade-in"
                style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
                onClick={() => onSelectBuilding(norm.building)}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-900/30 border border-sky-800/40 flex items-center justify-center flex-shrink-0">
                    <FileText size={16} className="text-sky-400" />
                  </div>
                  {hasFile && (
                    <a
                      href={norm.fileOrLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex items-center gap-1 text-[10px] text-sky-400 hover:text-sky-300 bg-sky-900/20 border border-sky-800/40 rounded-lg px-2 py-1 transition-colors"
                    >
                      <ExternalLink size={10} />
                      Abrir
                    </a>
                  )}
                </div>

                <h3 className={`font-semibold text-sm mb-1 leading-tight ${!norm.name || norm.name === '--' ? 'italic text-slate-500' : 'text-slate-100'}`}>
                  {!norm.name || norm.name === '--' ? 'Sin nombre' : norm.name}
                </h3>

                <p className={`text-xs mb-3 leading-relaxed line-clamp-2 ${!norm.description || norm.description === '--' ? 'italic text-slate-600' : 'text-slate-400'}`}>
                  {!norm.description || norm.description === '--' ? 'Sin descripción' : norm.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <span className="text-slate-600 text-[10px] flex items-center gap-1">
                    <BookOpen size={9} />
                    {norm.building.name}
                  </span>
                  <span className={`text-[10px] font-mono truncate max-w-[100px] ${hasFile ? 'text-sky-500' : 'italic text-slate-700'}`}>
                    {hasFile ? (norm.fileOrLink.split('/').pop() ?? norm.fileOrLink) : 'Sin archivo'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
