import { Info, ListTodo } from 'lucide-react';

interface PanelToggleButtonProps {
  side: 'left' | 'right';
  onClick: () => void;
}

export function PanelToggleButton({ side, onClick }: PanelToggleButtonProps) {
  const positionClasses = side === 'left' ? 'left-6' : 'right-6';
  const Icon = side === 'left' ? Info : ListTodo;

  return (
    <button
      onClick={onClick}
      className={`absolute top-6 p-2 rounded-full bg-white/60 text-slate-600 backdrop-blur-lg shadow-md border border-slate-200/80 hover:bg-white transition-colors
                 ${positionClasses}`}
    >
      <Icon className="w-6 h-6" />
    </button>
  );
}