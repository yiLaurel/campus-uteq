import { Home, Search, Users, Briefcase, FileText, Settings } from 'lucide-react';

interface Props {
  activePage: 'main' | 'buildings' | 'people' | 'tasks' | 'docs';
  onPageChange: (p: 'main' | 'buildings' | 'people' | 'tasks' | 'docs') => void;
}

function IconBtn({
  icon,
  active,
  onClick,
  title,
}: {
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-150
        ${active
          ? 'bg-[#1b4fa8] text-white shadow-sm'
          : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
        }`}
    >
      {icon}
    </button>
  );
}

export default function LeftIconBar({ activePage, onPageChange }: Props) {
  return (
    <aside className="w-[52px] flex-shrink-0 bg-white border-r border-gray-200 flex flex-col items-center pt-3 pb-4 gap-1">

      {/* Logo mark */}
      <div className="w-9 h-9 rounded-lg bg-[#1b4fa8] flex items-center justify-center mb-4 flex-shrink-0">
        <svg viewBox="0 0 100 100" width="22" height="22" fill="white">
          <ellipse cx="50" cy="35" rx="20" ry="24" />
          <path d="M30 35 Q16 27 11 13 Q28 18 38 32Z" />
          <path d="M70 35 Q84 27 89 13 Q72 18 62 32Z" />
          <path d="M36 57 Q50 78 64 57 Q58 72 50 88 Q42 72 36 57Z" />
        </svg>
      </div>

      {/* Nav icons */}
      <IconBtn icon={<Home size={17} />} active={activePage === 'main'} onClick={() => onPageChange('main')} title="Mapa Principal" />
      <IconBtn icon={<Search size={17} />} active={activePage === 'buildings'} onClick={() => onPageChange('buildings')} title="Buscar Edificios" />
      <IconBtn icon={<Users size={17} />} active={activePage === 'people'} onClick={() => onPageChange('people')} title="Personal" />
      <IconBtn icon={<Briefcase size={17} />} active={activePage === 'tasks'} onClick={() => onPageChange('tasks')} title="Tareas" />
      <IconBtn icon={<FileText size={17} />} active={activePage === 'docs'} onClick={() => onPageChange('docs')} title="Documentos" />

      {/* Settings pinned to bottom */}
      <div className="mt-auto">
        <IconBtn icon={<Settings size={17} />} title="Configuración" />
      </div>
    </aside>
  );
}
