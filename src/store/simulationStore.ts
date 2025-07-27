
import { create } from 'zustand';
import { TilePatch, PlanStage, ConstructionPlanResponse } from '@/types/simulation';
import { TileType } from '@/types/tiles';

const GRID_WIDTH = 100;
const GRID_HEIGHT = 100;

interface SimulationState {
  // --- STATE ---
  status: 'idle' | 'connecting' | 'generating' | 'finished' | 'error';
  errorMessage: string | undefined;
  plan: PlanStage[];
  currentPlanStep: number;
  grid: TileType[][];
  isConnected: boolean;
  isInfoPanelOpen: boolean;
  isPlanPanelOpen: boolean;
  // --- ACTIONS ---
  handleSimulationStarted: () => void;
  handlePlanCreated: (planResponse: ConstructionPlanResponse) => void;
  handleStageStarted: (stage: PlanStage) => void;
  applyPatch: (patch: TilePatch) => void; // Changed from batch to single
  handleSimulationEnded: () => void;
  startConnecting: () => void;
  setConnectionStatus: (isConnected: boolean) => void;
  handleGenerationFailed: (errorMessage: string) => void;
  setPlan: (plan: PlanStage[]) => void;
  setCurrentPlanStep: (step: number) => void;
  applyPatches: (patches: TilePatch[]) => void;
  finishGeneration: () => void;
  reset: () => void;
    toggleInfoPanel: () => void;
  togglePlanPanel: () => void;
}

export const useSimulationStore = create<SimulationState>((set, get) => ({
  status: 'idle',
  plan: [],
  currentPlanStep: -1,
  grid: Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(TileType.Empty)),
  isConnected: false,

  startConnecting: () => set({ status: 'connecting' }),
  setConnectionStatus: (isConnected) => set({ isConnected }),
  
  startGeneration: () => {
    const newGrid = Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(TileType.Empty));
    set({ status: 'generating', plan: [], currentPlanStep: -1, grid: newGrid });
  },
  
  setPlan: (plan) => set({ plan }),
  isInfoPanelOpen: true,
  isPlanPanelOpen: true, 
  
  toggleInfoPanel: () => set((state) => ({ isInfoPanelOpen: !state.isInfoPanelOpen })),
  togglePlanPanel: () => set((state) => ({ isPlanPanelOpen: !state.isPlanPanelOpen })),

  setCurrentPlanStep: (step) => {
    const currentPlan = get().plan;
    if (step > 0 && currentPlan[step - 1]) {
      currentPlan[step - 1].status = 'completed';
    }
    if (currentPlan[step]) {
      currentPlan[step].status = 'in-progress';
    }
    set({ plan: [...currentPlan], currentPlanStep: step });
  },
  
  applyPatches: (patches) => {
    set((state) => {
      const newGrid = state.grid.map(row => [...row]);
      patches.forEach(patch => {
        if (newGrid[patch.y]?.[patch.x] !== undefined) {
          newGrid[patch.y][patch.x] = patch.newType;
        }
      });
      return { grid: newGrid };
    });
  },

  finishGeneration: () => {
     const currentPlan = get().plan;
     currentPlan.forEach(step => step.status = 'completed');
     set({ status: 'finished', plan: [...currentPlan] });
  },

  handleSimulationStarted: () => {
    const newGrid = Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(TileType.Empty));
    set({ status: 'generating', plan: [], currentPlanStep: -1, grid: newGrid });
  },
  
  handlePlanCreated: (planResponse) => {
    const planWithStatus = planResponse.stages.map(s => ({ ...s, status: 'pending' as const }));
    set({ plan: planWithStatus });
  },

  handleStageStarted: (startedStage) => {
    const currentPlan = get().plan;
    let stageIndex = -1;
    const updatedPlan = currentPlan.map((stage, index) => {
      if (stage.name === startedStage.name) {
        stageIndex = index;
        return { ...stage, status: 'in-progress' as const };
      }
      if (stageIndex !== -1 && index < stageIndex) {
         return { ...stage, status: 'completed' as const };
      }
      return stage;
    });
    set({ plan: updatedPlan, currentPlanStep: stageIndex });
  },
  
  applyPatch: (patch) => {
    set((state) => {
      // For performance, we mutate the grid array directly.
      // This is safe within Zustand's set function.
      if (state.grid[patch.y]?.[patch.x] !== undefined) {
        state.grid[patch.y][patch.x] = patch.newType;
      }
      // We return a new object with the same grid reference to avoid a React re-render,
      // as our canvas will be updated imperatively.
      return { grid: state.grid };
    });
  },

  handleSimulationEnded: () => {
     const currentPlan = get().plan;
     currentPlan.forEach(step => step.status = 'completed');
     set({ status: 'finished', plan: [...currentPlan] });
  },

  handleGenerationFailed: (errorMessage) => set({ status: 'error', errorMessage }),
  
  reset: () => {
    const newGrid = Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(TileType.Empty));
    set({
      status: 'idle',
      errorMessage: undefined,
      plan: [],
      currentPlanStep: -1,
      grid: newGrid,
    });
  }
}));