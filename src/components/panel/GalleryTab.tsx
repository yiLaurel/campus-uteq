import { Building } from '../../types';
import { ImageOff, X, ChevronLeft, ChevronRight, FolderOpen, ZoomIn } from 'lucide-react';
import { useState } from 'react';

interface Props {
  building: Building;
}

export default function GalleryTab({ building }: Props) {
  const [failed, setFailed] = useState<Set<number>>(new Set());
  const [lightbox, setLightbox] = useState<number | null>(null);

  const markFailed = (i: number) => setFailed(prev => new Set(prev).add(i));

  const next = () => {
    if (lightbox === null) return;
    setLightbox((lightbox + 1) % building.images.length);
  };
  const prev = () => {
    if (lightbox === null) return;
    setLightbox((lightbox - 1 + building.images.length) % building.images.length);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
          {building.images.length} imágenes
        </span>
        <span className="flex items-center gap-1 text-slate-600 text-[10px]">
          <FolderOpen size={10} />
          /public/images/{building.id}/
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-2">
        {building.images.map((src, i) => {
          const isFailed = failed.has(i);
          const fileName = src.split('/').pop() ?? `image${i + 1}.jpg`;

          return (
            <div
              key={i}
              onClick={() => !isFailed && setLightbox(i)}
              className={`relative aspect-video rounded-xl overflow-hidden border transition-all duration-200 group
                ${isFailed
                  ? 'bg-slate-800/60 border-slate-700/50 cursor-default'
                  : 'bg-slate-800 border-slate-700 cursor-pointer hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-900/20'
                }`}
            >
              {isFailed ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                  <ImageOff size={18} className="text-slate-600 mb-1.5" />
                  <span className="text-[10px] text-slate-600 font-mono leading-tight">{fileName}</span>
                </div>
              ) : (
                <>
                  <img
                    src={src}
                    alt={`${building.name} ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={() => markFailed(i)}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                    <ZoomIn size={18} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                </>
              )}
              <span className="absolute bottom-1.5 right-1.5 text-[9px] bg-black/60 text-slate-300 px-1.5 py-0.5 rounded-md font-mono tabular-nums">
                {i + 1}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-[10px] text-slate-700 text-center mt-4">
        Agrega imágenes en <code className="text-slate-600">/public/images/{building.id}/</code>
      </p>

      {/* Lightbox */}
      {lightbox !== null && !failed.has(lightbox) && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
          onClick={() => setLightbox(null)}
        >
          <img
            src={building.images[lightbox]}
            alt={`${building.name} ${lightbox + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 rounded-full px-3 py-1 text-white text-xs">
            {lightbox + 1} / {building.images.length}
          </div>

          {/* Controls */}
          <button
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={16} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={e => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={e => { e.stopPropagation(); next(); }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
