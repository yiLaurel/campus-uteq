import { Building } from '../../types';

interface Props {
  building: Building;
  isSelected: boolean;
  onClick: (building: Building) => void;
}

const RISK_STYLES = {
  high:   { base: 'bg-red-500/55 border-red-500',     active: 'bg-red-500/85 border-red-400 hotspot-glow-red',    hover: 'hover:bg-red-500/75 hover:border-red-400 hotspot-glow-red' },
  medium: { base: 'bg-amber-500/55 border-amber-500', active: 'bg-amber-500/85 border-amber-400 hotspot-glow-amber', hover: 'hover:bg-amber-500/75 hover:border-amber-400 hotspot-glow-amber' },
  low:    { base: 'bg-emerald-500/55 border-emerald-500', active: 'bg-emerald-500/85 border-emerald-400 hotspot-glow-green', hover: 'hover:bg-emerald-500/75 hover:border-emerald-400 hotspot-glow-green' },
  none:   { base: 'bg-blue-500/40 border-blue-400/70',  active: 'bg-blue-500/80 border-blue-400 hotspot-glow-sky', hover: 'hover:bg-blue-500/65 hover:border-blue-400 hotspot-glow-sky' },
};

export default function MapHotspot({ building, isSelected, onClick }: Props) {
  const { position } = building;

  const hasHigh   = building.risks.some(r => r.level === 'high');
  const hasMedium = building.risks.some(r => r.level === 'medium');
  const hasLow    = building.risks.some(r => r.level === 'low');

  const key = hasHigh ? 'high' : hasMedium ? 'medium' : hasLow ? 'low' : 'none';
  const styles = RISK_STYLES[key];

  return (
    <button
      onClick={() => onClick(building)}
      title={building.name}
      className={`absolute group rounded border-2 flex items-center justify-center
        transition-all duration-200 ease-out
        ${isSelected
          ? `${styles.active} scale-105 z-10`
          : `${styles.base} ${styles.hover} hover:scale-105 hover:z-10 z-[1]`
        }
      `}
      style={{
        left:   `${position.left}%`,
        top:    `${position.top}%`,
        width:  `${position.width}%`,
        height: `${position.height}%`,
      }}
    >
      <span
        className={`text-white font-bold select-none leading-tight text-center px-0.5
          transition-opacity duration-150
          ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
        style={{ fontSize: 'clamp(6px, 1vw, 12px)', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
      >
        {building.shortName}
      </span>

      {isSelected && (
        <span className="absolute inset-0 rounded border-2 border-white/30 animate-ping" style={{ animationDuration: '1.5s' }} />
      )}
    </button>
  );
}
