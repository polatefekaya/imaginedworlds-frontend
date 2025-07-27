
import { TilePatch } from "@/types/simulation";
import { TileType } from "@/types/tiles";

const TILE_SIZE = 8;
const GRID_WIDTH = 100;
const GRID_HEIGHT = 100;
export const CANVAS_WIDTH = GRID_WIDTH * TILE_SIZE;
export const CANVAS_HEIGHT = GRID_HEIGHT * TILE_SIZE;

export const TILE_COLOR_MAP: Record<TileType, string> = {
  [TileType.Empty]: '#F8FAFC',            // slate-50 (Default background)
  [TileType.Placeholder]: '#E2E8F0',    // slate-200 (For AI planning visualization)

  [TileType.Grassland]: '#86EFAC',      // green-300
  [TileType.Dirt]: '#D2B48C',            // A standard tan/brown
  [TileType.Rock]: '#A8A29E',            // stone-400 (Bare rock face)
  [TileType.Sand]: '#FDE68A',            // amber-200
  [TileType.Snow]: '#F0F9FF',            // sky-50
  [TileType.Tundra]: '#D1D5DB',          // gray-300 (Cold, sparse ground)
  [TileType.SwampGround]: '#52525B',    // zinc-600 (Murky, wet earth)

  [TileType.OceanDeep]: '#1E40AF',       // blue-800
  [TileType.OceanShallow]: '#3B82F6',    // blue-500
  [TileType.River]: '#60A5FA',          // blue-400
  [TileType.Lake]: '#38BDF8',            // sky-400
  [TileType.SwampWater]: '#064E3B',      // emerald-900 (Stagnant, dark water)

  [TileType.DeciduousForest]: '#22C55E', // green-500
  [TileType.PineForest]: '#15803D',      // green-700
  [TileType.Jungle]: '#10B981',          // emerald-500
  [TileType.Farmland]: '#A3E635',        // lime-400
  [TileType.Shrubland]: '#A1A1AA',      // zinc-400 (Sparse bushes)

  [TileType.RoadPaved]: '#475569',       // slate-600
  [TileType.RoadDirt]: '#B49A6E',        // A lighter, path-like brown
  [TileType.RoadCobblestone]: '#71717A', // zinc-500
  [TileType.Bridge]: '#A16207',         // yellow-700 (Wood-like)
  [TileType.Railway]: '#44403C',        // stone-700
  [TileType.WallStone]: '#6B7280',       // gray-500
  [TileType.TunnelEntrance]: '#292524',  // stone-800

  [TileType.BuildingResidentialLow]: '#FB923C',   // orange-400
  [TileType.BuildingResidentialMid]: '#F97316',   // orange-500
  [TileType.BuildingResidentialHigh]: '#EA580C',  // orange-600

  [TileType.BuildingCommercialLow]: '#818CF8',    // indigo-400
  [TileType.BuildingCommercialMid]: '#6366F1',    // indigo-500
  [TileType.BuildingCommercialHigh]: '#4F46E5',   // indigo-600

  [TileType.BuildingIndustrialFactory]: '#78716C', // stone-500
  [TileType.BuildingIndustrialWarehouse]: '#A8A29E',// stone-400
  [TileType.HarborDocks]: '#57534E',              // stone-600
  [TileType.Mine]: '#44403C',                      // stone-700
  [TileType.PowerPlant]: '#EF4444',              // red-500 (As a warning/accent)

  [TileType.Ruins]: '#BCA58C',           // A weathered, sandy stone
  [TileType.Monument]: '#F5F5F4',         // stone-100 (Marble-like)
  [TileType.Castle]: '#9CA3AF',           // gray-400
  [TileType.Lighthouse]: '#DC2626',       // red-600
  [TileType.Oasis]: '#4ADE80',            // green-400 (Vibrant spot)

  [TileType.Fire]: '#FF0000',             // Pure Red
  [TileType.NeonGlow]: '#EC4899',         // pink-500
};


export function initializeCanvas(context: CanvasRenderingContext2D) {
  context.fillStyle = TILE_COLOR_MAP[TileType.Empty];
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

export function drawPatches(context: CanvasRenderingContext2D, patches: TilePatch[]) {
  patches.forEach(patch => {
    context.fillStyle = TILE_COLOR_MAP[patch.newType] || TILE_COLOR_MAP[TileType.Empty];
    context.fillRect(
      patch.x * TILE_SIZE,
      patch.y * TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE
    );
  });
}

export function drawPatch(context: CanvasRenderingContext2D, patch: TilePatch){
    context.fillStyle = TILE_COLOR_MAP[patch.newType] || TILE_COLOR_MAP[TileType.Empty];
    context.fillRect(
      patch.x * TILE_SIZE,
      patch.y * TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE
    );
}

