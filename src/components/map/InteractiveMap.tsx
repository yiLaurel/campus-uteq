import { Building } from '../../types';
import { buildings } from '../../data/buildings';
import MapHotspot from './MapHotspot';

interface Props {
  selectedBuilding: Building | null;
  onSelectBuilding: (building: Building | null) => void;
  filteredIds: string[] | null;
}

export default function InteractiveMap({ selectedBuilding, onSelectBuilding, filteredIds }: Props) {
  const visibleBuildings = filteredIds
    ? buildings.filter(b => filteredIds.includes(b.id))
    : buildings;

  return (
    <div className="w-full h-full overflow-auto flex items-start justify-center bg-gray-50">
      <div className="relative select-none w-full h-full">
        <img
          src="/WhatsApp_Image_2026-01-21_at_9.32.06_AM.jpeg"
          alt="Mapa del Campus UTEQ"
          className="w-full h-full object-contain block"
          draggable={false}
        />

        {visibleBuildings.map(building => (
          <MapHotspot
            key={building.id}
            building={building}
            isSelected={selectedBuilding?.id === building.id}
            onClick={b => onSelectBuilding(selectedBuilding?.id === b.id ? null : b)}
          />
        ))}

        {filteredIds !== null && filteredIds.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
            <p className="text-gray-500 text-sm font-semibold">Sin resultados</p>
            <p className="text-gray-400 text-xs mt-1">Prueba con otra búsqueda o filtro</p>
          </div>
        )}
      </div>
    </div>
  );
}
