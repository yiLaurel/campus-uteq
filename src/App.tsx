import { useState, useMemo } from 'react';
import { Building } from './types';
import { buildings } from './data/buildings';
import LeftIconBar from './components/LeftIconBar';
import InfoPanel from './components/InfoPanel';
import InteractiveMap from './components/map/InteractiveMap';

export default function App() {
  const [selected, setSelected] = useState<Building | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoneFilter, setZoneFilter] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [activePage, setActivePage] = useState<'main' | 'buildings' | 'people' | 'tasks' | 'docs'>('main');

  // Compute filtered building IDs for the map
  const filteredIds = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const hasFilter = q !== '' || zoneFilter !== '' || riskFilter !== 'all';
    if (!hasFilter) return null;

    return buildings
      .filter(b => {
        const matchesQuery =
          q === '' ||
          b.name.toLowerCase().includes(q) ||
          b.shortName.toLowerCase().includes(q);

        const matchesZone = zoneFilter === '' || b.id === zoneFilter;

        const matchesRisk =
          riskFilter === 'all' ||
          (riskFilter === 'low'    && b.risks.some(r => r.level === 'low')) ||
          (riskFilter === 'medium' && b.risks.some(r => r.level === 'medium')) ||
          (riskFilter === 'high'   && b.risks.some(r => r.level === 'high'));

        return matchesQuery && matchesZone && matchesRisk;
      })
      .map(b => b.id);
  }, [searchQuery, zoneFilter, riskFilter]);

  // When a zone is selected from the dropdown, also select that building
  const handleZoneFilter = (id: string) => {
    setZoneFilter(id);
    if (id) {
      const b = buildings.find(b => b.id === id) ?? null;
      setSelected(b);
    }
  };

  const handleMapSelect = (b: Building | null) => {
    setSelected(b);
    if (b) setZoneFilter(b.id);
    else setZoneFilter('');
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* ── Far-left icon bar ── */}
      <LeftIconBar activePage={activePage} onPageChange={setActivePage} />

      {/* ── Info panel ── */}
      <InfoPanel
        selected={selected}
        onSelect={handleMapSelect}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        zoneFilter={zoneFilter}
        onZoneFilter={handleZoneFilter}
        riskFilter={riskFilter}
        onRiskFilter={setRiskFilter}
      />

      {/* ── Map ── */}
      <div className="flex-1 overflow-hidden">
        <InteractiveMap
          selectedBuilding={selected}
          onSelectBuilding={handleMapSelect}
          filteredIds={filteredIds}
        />
      </div>
    </div>
  );
}
