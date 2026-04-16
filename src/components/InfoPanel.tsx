import { Building } from '../types';
import { buildings } from '../data/buildings';
import { Search, Image, FileText, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Props {
  selected: Building | null;
  onSelect: (b: Building | null) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  zoneFilter: string;
  onZoneFilter: (z: string) => void;
  riskFilter: string;
  onRiskFilter: (r: string) => void;
}

// ── Section wrapper ───────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className="h-px flex-1 bg-gray-150" style={{ background: '#e8ecf0' }} />
        <h3 className="text-[11px] font-bold text-gray-600 uppercase tracking-widest whitespace-nowrap px-1">
          {title}
        </h3>
        <div className="h-px flex-1 bg-gray-150" style={{ background: '#e8ecf0' }} />
      </div>
      {children}
    </div>
  );
}

// ── Info row ──────────────────────────────────────────────────
function InfoRow({ label, value }: { label: string; value: string }) {
  const isEmpty = !value || value === '--';
  return (
    <div className="flex items-baseline justify-between gap-2 py-[3px]">
      <span className="text-[11px] text-gray-500 flex-shrink-0">{label}</span>
      <span className="text-[11px] font-medium text-right truncate" style={{ color: isEmpty ? '#c0c8d4' : '#374151' }}>
        {value || '--'}
      </span>
    </div>
  );
}

// ── Risk badge ────────────────────────────────────────────────
const RISK_CONFIG = {
  low:    { label: 'Bajo',  dot: '#22c55e', bg: '#f0fdf4', text: '#166534', border: '#bbf7d0' },
  medium: { label: 'Medio', dot: '#f59e0b', bg: '#fffbeb', text: '#92400e', border: '#fde68a' },
  high:   { label: 'Alto',  dot: '#ef4444', bg: '#fef2f2', text: '#991b1b', border: '#fecaca' },
};

function RiskBadge({ level }: { level: 'low' | 'medium' | 'high' }) {
  const c = RISK_CONFIG[level];
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border"
      style={{ background: c.bg, color: c.text, borderColor: c.border }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.dot }} />
      {c.label}
    </span>
  );
}

// ── Info de Edificio ──────────────────────────────────────────
function InfoSection({ b }: { b: Building | null }) {
  const info = b?.info;
  const rows: [string, string][] = [
    ['Salones',               info?.classrooms        ?? '--'],
    ['Oficina de dirección',  info?.directionOffice   ?? '--'],
    ['Baños de mujeres',      info?.womensRestrooms   ?? '--'],
    ['Baños de hombres',      info?.mensRestrooms     ?? '--'],
    ['Baños de maestros',     info?.teachersRestrooms ?? '--'],
    ['Salas audiovisuales',   info?.audiovisualRooms  ?? '--'],
    ['Salas de maestros',     info?.teachersRooms     ?? '--'],
    ['Cubículos',             info?.cubicles          ?? '--'],
    ['Oficinas admin.',       info?.adminOffices      ?? '--'],
  ];

  return (
    <Section title="Información de Edificio">
      <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
        {rows.map(([label, value], i) => (
          <div
            key={label}
            className="px-3"
            style={{ background: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}
          >
            <InfoRow label={label} value={value} />
            {i < rows.length - 1 && <div className="h-px" style={{ background: '#f1f5f9' }} />}
          </div>
        ))}
      </div>
    </Section>
  );
}

// ── Riesgos ───────────────────────────────────────────────────
function RisksSection({ b }: { b: Building | null }) {
  const risks = b?.risks ?? [];

  return (
    <Section title="Riesgos Identificados">
      {/* Legend pills */}
      <div className="flex items-center gap-1.5 mb-3 flex-wrap">
        {(['low', 'medium', 'high'] as const).map(l => (
          <RiskBadge key={l} level={l} />
        ))}
      </div>

      {risks.length === 0 ? (
        <div className="space-y-2">
          {[1, 2].map(i => (
            <div key={i} className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-gray-300">Sin datos</span>
                <span className="text-[10px] text-gray-300">--</span>
              </div>
              <p className="text-[10px] text-gray-300">Descripción: --</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {risks.map(r => {
            const cfg = RISK_CONFIG[r.level as keyof typeof RISK_CONFIG] ?? RISK_CONFIG.low;
            return (
              <div
                key={r.id}
                className="rounded-lg border px-3 py-2.5"
                style={{ background: cfg.bg, borderColor: cfg.border }}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] font-semibold text-gray-800 truncate">{r.name || '--'}</span>
                  <RiskBadge level={r.level as 'low' | 'medium' | 'high'} />
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed">{r.description || '--'}</p>
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
}

// ── Galería ───────────────────────────────────────────────────
function GallerySection({ b }: { b: Building | null }) {
  const [failed, setFailed] = useState<Set<number>>(new Set());
  const [lightbox, setLightbox] = useState<number | null>(null);
  const images = b?.images ?? Array.from({ length: 10 }, (_, i) => `/images/placeholder/image${i + 1}.jpg`);

  return (
    <Section title="Galería de Imágenes">
      <div className="grid grid-cols-3 gap-1.5">
        {images.map((src, i) => {
          const isFailed = failed.has(i);
          return (
            <div
              key={i}
              onClick={() => !isFailed && setLightbox(i)}
              className={`aspect-square rounded-lg overflow-hidden border transition-all duration-150
                ${isFailed
                  ? 'border-gray-200 bg-gray-50 cursor-default'
                  : 'border-gray-200 bg-gray-100 cursor-pointer hover:border-blue-400 hover:shadow-md hover:scale-[1.03]'
                }`}
            >
              {isFailed ? (
                <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                  <Image size={14} className="text-gray-300" />
                  <span className="text-[8px] text-gray-300 font-mono text-center px-1 leading-tight">
                    {`img${i + 1}.jpg`}
                  </span>
                </div>
              ) : (
                <img
                  src={src}
                  alt={`img ${i + 1}`}
                  className="w-full h-full object-cover"
                  onError={() => setFailed(p => new Set(p).add(i))}
                />
              )}
            </div>
          );
        })}
      </div>

      {lightbox !== null && !failed.has(lightbox) && (
        <div
          className="fixed inset-0 bg-black/85 flex items-center justify-center z-50"
          onClick={() => setLightbox(null)}
        >
          <img
            src={images[lightbox]}
            alt={`img ${lightbox + 1}`}
            className="max-w-[88vw] max-h-[84vh] object-contain rounded-xl shadow-2xl"
          />
          <button
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white text-sm hover:bg-white/25 transition-colors"
            onClick={() => setLightbox(null)}
          >✕</button>
        </div>
      )}
    </Section>
  );
}

// ── NOM y Documentos ──────────────────────────────────────────
function NomSection({ b }: { b: Building | null }) {
  const norms = b?.norms ?? [];

  return (
    <Section title="NOM y Documentos">
      {norms.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white px-3 py-3 space-y-2">
          {[['Normativa', '--'], ['Descripción', '--'], ['Enlace PDF', '--']].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-2">
              <span className="text-[11px] text-gray-500 flex-shrink-0 flex items-center gap-1.5">
                <FileText size={10} className="text-gray-400" /> {k}
              </span>
              <span className="text-[11px] text-gray-300">--</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {norms.map((n, i) => (
            <div key={n.id} className="rounded-lg border border-gray-200 bg-white px-3 py-3 space-y-2">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[11px] text-gray-500">Normativa</span>
                <span className="text-[11px] font-medium text-gray-700 text-right">{n.name || '--'}</span>
              </div>
              <div className="h-px bg-gray-100" />
              <p className="text-[10px] text-gray-500 leading-relaxed">{n.description || '--'}</p>
              {n.fileOrLink && n.fileOrLink !== '--' ? (
                <a
                  href={n.fileOrLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] text-blue-600 hover:text-blue-800 font-medium"
                >
                  <FileText size={10} /> Ver PDF
                </a>
              ) : (
                <span className="text-[10px] text-gray-300">Enlace PDF: --</span>
              )}
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

// ── Custom select ─────────────────────────────────────────────
function StyledSelect({
  value,
  onChange,
  children,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  placeholder: string;
}) {
  return (
    <div className="relative flex-1">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-gray-200 bg-white text-[11px] text-gray-600 pl-3 pr-7 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all cursor-pointer shadow-sm hover:border-gray-300"
        style={{ color: value ? '#374151' : '#9ca3af' }}
      >
        <option value="">{placeholder}</option>
        {children}
      </select>
      <ChevronDown
        size={12}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
    </div>
  );
}

// ── Main InfoPanel ────────────────────────────────────────────
export default function InfoPanel({
  selected,
  onSelect,
  searchQuery,
  onSearchChange,
  zoneFilter,
  onZoneFilter,
  riskFilter,
  onRiskFilter,
}: Props) {
  return (
    <div className="w-[268px] flex-shrink-0 bg-[#f8fafc] border-r border-gray-200 flex flex-col overflow-hidden">

      {/* ── Logo header ── */}
      <div className="flex items-center gap-3 px-4 py-3.5 bg-white border-b border-gray-200">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #1b4fa8 0%, #1565c0 100%)' }}
        >
          <svg viewBox="0 0 100 100" width="21" height="21" fill="white">
            <ellipse cx="50" cy="35" rx="20" ry="24" />
            <path d="M30 35 Q16 27 11 13 Q28 18 38 32Z" />
            <path d="M70 35 Q84 27 89 13 Q72 18 62 32Z" />
            <path d="M36 57 Q50 78 64 57 Q58 72 50 88 Q42 72 36 57Z" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-extrabold text-[#1b4fa8] leading-none tracking-tight">UTEQ</p>
          <p className="text-[10px] text-gray-400 leading-snug mt-0.5">Universidad Tecnológica de Querétaro</p>
        </div>
      </div>

      {/* ── Search ── */}
      <div className="px-4 pt-3 pb-2 bg-white border-b border-gray-200">
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Buscar edificio..."
            className="w-full rounded-lg border border-gray-200 bg-white text-[12px] text-gray-700 placeholder-gray-400 pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all shadow-sm hover:border-gray-300"
          />
        </div>
      </div>

      {/* ── Dropdowns ── */}
      <div className="px-4 pt-2.5 pb-3 bg-white border-b border-gray-200 space-y-2">
        <StyledSelect value={zoneFilter} onChange={onZoneFilter} placeholder="-- Seleccionar Zona --">
          {buildings.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </StyledSelect>
        <StyledSelect value={riskFilter} onChange={onRiskFilter} placeholder="-- Nivel de Riesgo --">
          <option value="all">Todos los niveles</option>
          <option value="low">Bajo</option>
          <option value="medium">Medio</option>
          <option value="high">Alto</option>
        </StyledSelect>
      </div>

      {/* ── Selected building chip ── */}
      <div className="px-4 py-2.5 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2 rounded-lg bg-blue-50 border border-blue-100 px-3 py-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
          <p className="text-[10px] font-semibold text-blue-700 truncate uppercase tracking-wide">
            {selected ? selected.name : 'Ningún edificio seleccionado'}
          </p>
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-4 space-y-5">
          <InfoSection b={selected} />
          <RisksSection b={selected} />
          <GallerySection b={selected} />
          <div className="pb-2">
            <NomSection b={selected} />
          </div>
        </div>
      </div>
    </div>
  );
}
