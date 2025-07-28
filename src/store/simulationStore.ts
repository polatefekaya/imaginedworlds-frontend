// @ts-nocheck 

import { create } from 'zustand';
import { TilePatch, PlanStage, ConstructionPlanResponse, Agent, FocusResponse, CommentedTilePatchResponse } from '@/types/simulation';
import { TileType } from '@/types/tiles';
import { apiService } from '@/services/apiService';

const GRID_WIDTH = 100;
const GRID_HEIGHT = 100;
const MAX_PATCH_LOG_SIZE = 10;


interface SimulationState {
  status: 'idle' | 'fetching_agents' | 'ready' | 'generating' | 'cancelling' | 'finished' | 'error';
  agents: Agent[];
  selectedAgentCodeName: string | null;
  errorMessage: string | undefined;
  plan: PlanStage[];
  currentPlanStep: number;
  currentFocus: FocusResponse | null;
  latestPatches: CommentedTilePatchResponse[];
  grid: TileType[][];
  isConnected: boolean;
  isInfoPanelOpen: boolean;
  isPlanPanelOpen: boolean;
  
  startConnecting: () => void;
  setConnectionStatus: (isConnected: boolean) => void;
  fetchAgents: () => Promise<void>;
  handleFocusChanged: (focus: FocusResponse) => void;
  selectAgent: (codeName: string) => void;
  startGeneration: (prompt: string) => Promise<void>;
  startCancelling: () => void;
  handleSimulationStarted: () => void;
  handlePlanCreated: (planResponse: ConstructionPlanResponse) => void;
  handleStageStarted: (stage: PlanStage) => void;
  applyPatch: (patch: TilePatch) => void; 
  handleSimulationEnded: () => void;
  handleGenerationFailed: (errorMessage: string) => void;
  setPlan: (plan: PlanStage[]) => void;
  setCurrentPlanStep: (step: number) => void;
  applyPatches: (patches: TilePatch[]) => void;

  finishGeneration: () => void;

  reset: () => void;
  resetWithoutGridReset: () => void;
  toggleInfoPanel: () => void;
  togglePlanPanel: () => void;
}

export const useSimulationStore = create<SimulationState>((set, get) => ({
  status: 'idle',
  plan: [],
  currentFocus: null,
  latestPatches: [],
  currentPlanStep: -1,
  grid: Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(TileType.Empty)),
  isConnected: false,

  startConnecting: () => set({ status: 'connecting' }),
  setConnectionStatus: (isConnected) => set({ isConnected }),
  fetchAgents: async () => {
    set({ status: 'fetching_agents' });
    const response = await apiService.fetchAgents();
    if (response.success) {
      set({ agents: response.data, status: 'idle' });
    } else {
      set({ status: 'error', errorMessage: response.error });
    }
  },

  handleFocusChanged: (focus) => set({ currentFocus: focus }),

  selectAgent: (codeName) => {
    set({ selectedAgentCodeName: codeName, status: 'ready' });
  },

  startGeneration: async (prompt) => {
    const { isConnected, selectedAgentCodeName } = get();
    if (!prompt || !selectedAgentCodeName || !isConnected) return;

    get().reset();
    set({ status: 'generating' });

    const response = await apiService.startGeneration(prompt, selectedAgentCodeName);
    if (!response.success) {
      get().handleGenerationFailed(response.error);
    }
  },

  startCancelling: () => {
    set({ status: 'cancelling' });
  },
  // startGeneration: () => {
  //   const newGrid = Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(TileType.Empty));
  //   set({ status: 'generating', plan: [], currentPlanStep: -1, grid: newGrid });
  // },
  
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
          newGrid[patch.y][patch.x] = patch.tileType;
        }
      });
      return { grid: newGrid };
    });
  },

  finishGeneration: () => {
    console.log("FinishGeneration received");
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
        state.grid[patch.y][patch.x] = patch.tileType;
      }
      
      const newPatches = [patch, ...state.latestPatches];
      if (newPatches.length > MAX_PATCH_LOG_SIZE) {
        newPatches.pop();
      }

      return { grid: state.grid, latestPatches: newPatches };
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
      selectedAgentCodeName: null,
      currentFocus: null, 
      latestPatches: [] 
    });
  },
  resetWithoutGridReset: () => {
    set({
      status: 'idle',
      errorMessage: undefined,
      plan: [],
      currentPlanStep: -1,
      selectedAgentCodeName: null,
      currentFocus: null, 
      latestPatches: [] 
    });
  }
}));