import { TileType } from "./tiles";

export interface TilePatch {
  x: number;
  y: number;
  newType: TileType;
}

export interface CommentedTilePatchResponse extends TilePatch {
  comment: string;
}

export interface PlanStage {
  name: string;
  details: string;
  estimated_steps: number;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface ConstructionPlanResponse {
  overallPlan: string;
  stages: PlanStage[];
}

export interface FocusResponse {
  x: number;
  y: number;
  range: number;
}