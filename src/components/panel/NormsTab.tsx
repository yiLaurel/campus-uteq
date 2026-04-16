import { Building, NormDocument } from '../../types';
import { FileText, ExternalLink, FilePlus, Hash } from 'lucide-react';

interface Props {
  building: Building;
}

function NormCard({ norm }: { norm: NormDocument }) {
  const hasFile = norm.fileOrLink && norm.fileOrLink !== '--';
  return (
    <div className="card p-4 mb-3 hover:border-slate-600 transition-colors">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-sky-900/30 border border-sky-800/40 flex items-center justify-center flex-shrink-0">
            <FileText size={13} className="text-sky-400" />
          </div>
          <span className={`text-sm font-semibold leading-tight ${!norm.name || norm.name === '--' ? 'italic text-slate-500' : 'text-slate-100'}`}>
            {!norm.name || norm.name === '--' ? 'Sin nombre' : norm.name}
          </span>
        </div>
        {hasFile && (
          <a
            href={norm.fileOrLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 flex-shrink-0 transition-colors bg-sky-900/20 border border-sky-800/40 rounded-lg px-2 py-1"
          >
            <ExternalLink size={11} />
            Ver
          </a>
        )}
      </div>

      <p className={`text-xs leading-relaxed mb-3 ${!norm.description || norm.description === '--' ? 'italic text-slate-600' : 'text-slate-300'}`}>
        {!norm.description || norm.description === '--' ? 'Sin descripción disponible' : norm.description}
      </p>

      <div className="bg-slate-800/60 rounded-lg px-3 py-2 flex items-center gap-2">
        <FileText size={11} className="text-slate-600 flex-shrink-0" />
        <span className={`text-[10px] font-mono truncate ${hasFile ? 'text-slate-300' : 'italic text-slate-600'}`}>
          {hasFile ? norm.fileOrLink : 'Archivo o enlace PDF no especificado'}
        </span>
      </div>
    </div>
  );
}

function EmptyTemplate() {
  return (
    <div className="rounded-xl border border-dashed border-slate-700/60 p-4 mb-3 opacity-40">
      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center">
          <FileText size={13} className="text-slate-500" />
        </div>
        <span className="italic text-slate-500 text-sm">Nombre de la NOM</span>
      </div>
      <p className="italic text-slate-600 text-xs mb-3">Descripción de la normativa...</p>
      <div className="bg-slate-800/40 rounded-lg px-3 py-2">
        <span className="text-[10px] font-mono italic text-slate-700">enlace-documento.pdf</span>
      </div>
    </div>
  );
}

export default function NormsTab({ building }: Props) {
  const { norms } = building;

  if (norms.length === 0) {
    return (
      <div>
        <EmptyTemplate />
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-3">
            <FilePlus size={20} className="text-slate-600" />
          </div>
          <p className="text-slate-400 font-semibold text-sm mb-1.5">Sin documentos registrados</p>
          <p className="text-slate-600 text-xs leading-relaxed max-w-[200px]">
            Agrega normativas en <code className="text-slate-500">buildings.ts</code> bajo el campo <code className="text-slate-500">norms</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Hash size={11} className="text-slate-600" />
        <span className="text-slate-500 text-xs">
          {norms.length} documento{norms.length !== 1 ? 's' : ''}
        </span>
      </div>
      {norms.map(norm => <NormCard key={norm.id} norm={norm} />)}
    </div>
  );
}
