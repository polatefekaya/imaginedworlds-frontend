import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface PanelProps {
  side: 'left' | 'right';
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Panel({ side, isOpen, onClose, children }: PanelProps) {
  const positionClasses = side === 'left' ? 'left-6' : 'right-6';
  
  const translateClasses = isOpen 
    ? 'translate-x-0' 
    : (side === 'left' ? '-translate-x-[calc(100%+3rem)]' : 'translate-x-[calc(100%+3rem)]');

  return (
    <div
      className={`absolute top-6 bottom-6 w-96 rounded-2xl bg-white p-6 backdrop-blur-lg border border-slate-300 
                 transition-transform duration-500 ease-in-out ${positionClasses} ${translateClasses}`}
    >
        
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 rounded-full transition-colors"
      >
        <X className="w-5 h-5" />
        <span className="sr-only">Close Panel</span>
      </button>
      {children}
    </div>
  );
}