import { TileType } from "./tiles";

export interface TilePatch {
  x: number;
  y: number;
  tileType: TileType;
}

export interface FlatTilePatch {
  x: number;
  y: number;
  tileType: number;
}

export interface FlatCommentedTilePatchResponse extends FlatTilePatch {
  comment: string;
}

export interface CommentedTilePatchResponse extends TilePatch {
  comment: string;
}

export interface Agent {
  id: string;
  displayName: string;
  codeName: string;
  description: string;
  iconUrl: string;
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