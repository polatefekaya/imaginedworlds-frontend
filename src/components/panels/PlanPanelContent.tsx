'use client';

import { useSimulationStore } from '@/store/simulationStore';
import { CheckCircle2, Loader2, Circle } from 'lucide-react';

export function PlanPanelContent() {
  const plan = useSimulationStore((state) => state.plan);

    const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'in-progress':
        return <Loader2 className="w-5 h-5 text-sky-500 animate-spin" />;
      default:
        return <Circle className="w-5 h-5 text-slate-400" />;
    }
  };
  return (
    <>
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">Construction Plan</h2>
      {plan.length === 0 ? (
        <p className="text-slate-500">Awaiting your vision...</p>
      ) : (
        <ul className="space-y-4">
          {plan.map((step, index) => (
            <li key={index} className="flex items-start gap-4">
              <div className="mt-1 flex-shrink-0">{getStatusIcon(step.status)}</div>
              <span className={`flex-1 ${step.status === 'pending' ? 'text-slate-500' : 'text-slate-800'}`}>
                {step.details}
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}