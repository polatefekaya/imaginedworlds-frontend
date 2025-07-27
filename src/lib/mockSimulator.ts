import { useSimulationStore } from '@/store/simulationStore';
import {  PlanStage, TilePatch } from '@/types/simulation';
import { TileType } from '@/types/tiles';

// This is our fake plan, as if it came from the AI.
const MOCK_PLAN: PlanStage[] = [
  { status: 'pending', text: 'Strategic Decision: Defining coastline and primary landmass.' },
  { status: 'pending', text: 'Tactical Step: Generating mountain ranges in the north.' },
  { status: 'pending', text: 'Tactical Step: Carving a river from mountains to the sea.' },
  { status: 'pending', text: 'Strategic Decision: Zoning port, residential, and forest areas.' },
  { status: 'pending', text: 'Tactical Step: Paving main arterial roads.' },
  { status: 'pending', text: 'Tactical Step: Constructing buildings in zoned areas.' },
  { status: 'pending', text: 'Detailing: Adding forests and sandy beaches.' },
];

const generateMockPatches = (): TilePatch[] => {
    const patches: TilePatch[] = [];
    const numPatches = Math.floor(Math.random() * 20) + 10; // 10-29 patches per batch
    for (let i = 0; i < numPatches; i++) {
        patches.push({
            x: Math.floor(Math.random() * 100),
            y: Math.floor(Math.random() * 100),
            newType: Math.floor(Math.random() * 8) as TileType,
        });
    }
    return patches;
};

let simulationInterval: NodeJS.Timeout | null = null;

export const mockSimulationService = {
  start: (prompt: string) => {
    if (simulationInterval) {
      clearInterval(simulationInterval);
    }
    
    const { startGeneration, setPlan, setCurrentPlanStep, applyPatches, finishGeneration } = useSimulationStore.getState();

    startGeneration();
    console.log(`Mock simulation started for prompt: "${prompt}"`);

    setPlan(MOCK_PLAN.map(p => ({...p})));
    
    let currentStep = 0;
    setCurrentPlanStep(currentStep);

    simulationInterval = setInterval(() => {
      if (Math.random() > 0.75 && currentStep < MOCK_PLAN.length - 1) {
          currentStep++;
          setCurrentPlanStep(currentStep);
      }

      const newPatches = generateMockPatches();
      applyPatches(newPatches);

      if (currentStep >= MOCK_PLAN.length - 1 && Math.random() > 0.9) {
          if (simulationInterval) clearInterval(simulationInterval);
          finishGeneration();
          console.log("Mock simulation finished.");
      }

    }, 150); 
  },

  stop: () => {
    if (simulationInterval) {
        clearInterval(simulationInterval);
        simulationInterval = null;
        useSimulationStore.getState().finishGeneration();
    }
  }
};
