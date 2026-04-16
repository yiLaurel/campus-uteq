import { Building } from '../../types';
import { BookOpen, Users, Briefcase, Hash } from 'lucide-react';

interface Props {
  building: Building;
}

function FieldRow({ label, value }: { label: string; value: string }) {
  const empty = value === '--' || value === '';
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-800/80 last:border-0 gap-3">
      <span className="text-slate-400 text-xs">{label}</span>
      <span className={`text-xs font-semibold text-right ${empty ? 'text-slate-700 italic' : 'text-slate-100'}`}>
        {empty ? '—' : value}
      </span>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="card p-4 mb-3">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-md bg-sky-900/40 flex items-center justify-center">
          <span className="text-sky-400">{icon}</span>
        </div>
        <h3 className="text-slate-300 font-semibold text-xs uppercase tracking-widest">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function InfoTab({ building }: Props) {
  const { info } = building;
  return (
    <div>
      <Section icon={<BookOpen size={13} />} title="Espacios Académicos">
        <FieldRow label="Salones" value={info.classrooms} />
        <FieldRow label="Salas Audiovisuales" value={info.audiovisualRooms} />
        <FieldRow label="Salas de Maestros" value={info.teachersRooms} />
        <FieldRow label="Cubículos" value={info.cubicles} />
      </Section>

      <Section icon={<Users size={13} />} title="Servicios Sanitarios">
        <FieldRow label="Baños de Mujeres" value={info.womensRestrooms} />
        <FieldRow label="Baños de Hombres" value={info.mensRestrooms} />
        <FieldRow label="Baños de Maestros" value={info.teachersRestrooms} />
      </Section>

      <Section icon={<Briefcase size={13} />} title="Administración">
        <FieldRow label="Oficina de Dirección" value={info.directionOffice} />
        <FieldRow label="Oficinas Administrativas" value={info.adminOffices} />
      </Section>

      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/60 border border-dashed border-slate-700/60">
        <Hash size={11} className="text-slate-600 flex-shrink-0" />
        <p className="text-[10px] text-slate-600">
          Edita en <code className="text-slate-500">src/data/buildings.ts</code> — edificio <code className="text-slate-500">"{building.id}"</code>
        </p>
      </div>
    </div>
  );
}
