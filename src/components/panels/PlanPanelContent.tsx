"use client";

import { useSimulationStore } from "@/store/simulationStore";
import { CheckCircle2, Loader2, Circle, Target, Brush } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function PlanPanelContent() {
  const { plan, currentFocus, latestPatches, status } = useSimulationStore();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case "in-progress":
        return <Loader2 className="w-5 h-5 text-sky-500 animate-spin" />;
      default:
        return <Circle className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">
        Live Dashboard
      </h2>

      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800 mb-3">Master Plan</h3>
        {plan.length === 0 ? (
          <p className="text-slate-500 text-sm">Awaiting your vision...</p>
        ) : (
          <ul className="space-y-3 text-sm">
            {plan.map((step) => (
              <li key={step.name} className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0">
                  {getStatusIcon(step.status)}
                </div>
                <div className="flex-1">
                  <span
                    className={`font-semibold ${
                      step.status === "pending"
                        ? "text-slate-500"
                        : "text-slate-800"
                    }`}
                  >
                    {step.name}
                  </span>
                  <p
                    className={`text-xs ${
                      step.status === "pending"
                        ? "text-slate-400"
                        : "text-slate-600"
                    }`}
                  >
                    {step.details}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800 mb-3">AI Focus</h3>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFocus ? `${currentFocus.x}-${currentFocus.y}` : "none"}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 p-3 bg-sky-50 rounded-lg border border-sky-200"
          >
            <Target className="w-5 h-5 text-sky-600 flex-shrink-0" />
            <span className="text-sm text-sky-800">
              {currentFocus
                ? `Scanning region at (${currentFocus.x}, ${currentFocus.y}) with a range of ${currentFocus.range}.`
                : "Awaiting strategic decision..."}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-3">Action Log</h3>
        <div className="relative h-45 overflow-y-auto rounded-lg bg-slate-200/50 p-3">
          <AnimatePresence initial={false}>
            {latestPatches.map((patch, index) => (
              <motion.div
                key={`${patch.x}-${patch.y}-${index}`}
                layout
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex items-start gap-2 mb-1 text-xs"
              >
                <Brush className="w-3 h-3 text-slate-500 mt-0.5 flex-shrink-0" />
                <p className="text-slate-700">
                  <span className="font-semibold">{patch.tileType}:</span>{" "}
                  {patch.comment}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
          {latestPatches.length === 0 && status === "generating" && (
            <p className="text-slate-500 text-sm italic text-center pt-12">
              Waiting for first actions...
            </p>
          )}
        </div>
      </div>
    </>
  );
}
