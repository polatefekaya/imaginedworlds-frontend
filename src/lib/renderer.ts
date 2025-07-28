
import { TilePatch } from "@/types/simulation";
import { TileType } from "@/types/tiles";

const TILE_SIZE = 8;
const GRID_WIDTH = 100;
const GRID_HEIGHT = 100;
export const CANVAS_WIDTH = GRID_WIDTH * TILE_SIZE;
export const CANVAS_HEIGHT = GRID_HEIGHT * TILE_SIZE;

export const TILE_COLOR_MAP: Record<TileType, string> = {
  // --- System & Meta Tiles (0-9) ---
  [TileType.Empty]: '#FFFFFF',            // A dark, slate-like void
  [TileType.Placeholder]: '#6B7280',    // Neutral gray for AI planning
  [TileType.Boundary]: '#000000',          // Absolute black for impassable world borders
  [TileType.FogOfWar]: '#374151',        // Dark gray for unexplored areas
  [TileType.Error]: '#EF4444',            // Bright, unmissable red for errors

  // --- Basic Terrain & Ground Cover (10-49) ---
  [TileType.Grassland]: '#4ADE80',      // A vibrant, standard green
  [TileType.Dirt]: '#A16207',            // Rich, earthy brown
  [TileType.Rock]: '#6B7280',            // Neutral stone gray
  [TileType.Sand]: '#FBBF24',            // Warm desert/beach sand
  [TileType.Snow]: '#F9FAFB',            // Off-white, fresh snow
  [TileType.Tundra]: '#9CA3AF',          // Cold, muted gray-green
  [TileType.SwampGround]: '#3F3F46',    // Dark, murky wet earth
  [TileType.Mud]: '#78350F',            // A deep, wet brown
  [TileType.Gravel]: '#A8A29E',          // Small, loose stones
  [TileType.Clay]: '#E11D48',            // Rich red clay
  [TileType.CharredGround]: '#292524',  // Scorched, ashen earth
  [TileType.SaltFlats]: '#E5E7EB',        // Bright, sterile white salt
  [TileType.CrystalGround]: '#A78BFA',  // Land infused with purple crystals
  [TileType.VolcanicAsh]: '#44403C',    // Fine, dark volcanic ash
  [TileType.ObsidianShardPlains]: '#1C1917', // Jagged, black volcanic glass
  [TileType.Permafrost]: '#DBEAFE',      // A pale, icy blue

  // --- Water & Liquid Bodies (50-99) ---
  [TileType.OceanDeep]: '#1E3A8A',       // Deep, dark ocean blue
  [TileType.OceanShallow]: '#3B82F6',    // Lighter, coastal water
  [TileType.River]: '#60A5FA',          // Standard flowing river blue
  [TileType.Lake]: '#38BDF8',            // Still, clear lake blue
  [TileType.SwampWater]: '#064E3B',      // Stagnant, dark green water
  [TileType.HotSpring]: '#CFFCF1',      // Steamy, pale teal
  [TileType.Waterfall]: '#BFDBFE',      // White, foamy water
  [TileType.Rapids]: '#93C5FD',          // Turbulent, churning blue
  [TileType.Geyser]: '#E0F2FE',          // Erupting steam and water
  [TileType.Marsh]: '#52525B',            // Murky wetland
  [TileType.Quicksand]: '#CA8A04',        // Deceptive, sinking sand
  [TileType.TarPit]: '#171717',          // Thick, black tar
  [TileType.LavaRiver]: '#F97316',      // Flowing, molten orange
  [TileType.LavaLake]: '#EA580C',        // Hotter, pooled lava
  [TileType.AcidPool]: '#A3E635',        // Corrosive, bubbling lime green
  [TileType.FrozenRiver]: '#93C5FD',    // Solid, icy river
  [TileType.FrozenLake]: '#A5B4FC',      // Deep frozen lake
  [TileType.IceSheet]: '#E0E7FF',        // Floating sheets of ice
  [TileType.UndergroundRiver]: '#4338CA', // Dark water in caverns

  // --- Vegetation & Biomes (100-149) ---
  [TileType.DeciduousForest]: '#22C55E', // Standard seasonal forest green
  [TileType.PineForest]: '#15803D',      // Deep, coniferous green
  [TileType.Jungle]: '#059669',          // Dense, wet tropical green
  [TileType.Farmland]: '#BEF264',        // Cultivated crops
  [TileType.Shrubland]: '#65A30D',        // Dry bushes and shrubs
  [TileType.Savannah]: '#FACC15',        // Golden grass with sparse trees
  [TileType.Orchard]: '#F87171',          // Rows of fruit trees
  [TileType.Vineyard]: '#A21CAF',        // Rich purple for grapevines
  [TileType.FlowerField]: '#EC4899',    // A field of vibrant flowers
  [TileType.BambooForest]: '#34D399',    // Light green bamboo stalks
  [TileType.MangroveForest]: '#047857',  // Coastal forest in salt water
  [TileType.MushroomGrove]: '#C084FC',    // Bioluminescent, fantasy mushrooms
  [TileType.PetrifiedForest]: '#78716C', // Trees turned to stone

  // --- Geological Features (150-199) ---
  [TileType.Mountain]: '#57534E',              // Dark, imposing rock
  [TileType.MountainPeakSnow]: '#F9FAFB',      // Snow-capped peak
  [TileType.Hills]: '#B45309',                // Rolling, earthy hills
  [TileType.VolcanoDormant]: '#4B5563',      // Cold, gray volcanic cone
  [TileType.VolcanoActive]: '#DC2626',        // Erupting red lava
  [TileType.CaveEntrance]: '#292524',          // A dark opening in a rockface
  [TileType.Canyon]: '#9A3412',                // Deep, red-rock canyon
  [TileType.Plateau]: '#EAB308',              // High, flat ground
  [TileType.Mesa]: '#D97706',                  // Isolated, steep-sided mesa
  [TileType.Oasis]: '#34D399',                // A vibrant spot of life in a desert

  // --- Infrastructure & Transportation (200-249) ---
  [TileType.RoadPaved]: '#475569',             // Dark asphalt or concrete
  [TileType.RoadDirt]: '#E2B37A',              // A simple, well-trodden path
  [TileType.RoadCobblestone]: '#71717A',       // Gray, uneven stone road
  [TileType.Bridge]: '#A16207',               // Wooden or rustic bridge
  [TileType.Railway]: '#44403C',              // Dark steel and wood ties
  [TileType.WallStone]: '#6B7280',             // Defensive stone walls
  [TileType.TunnelEntrance]: '#1C1917',        // A black, man-made tunnel opening
  [TileType.Highway]: '#334155',              // Multi-lane major road
  [TileType.Overpass]: '#64748B',            // Concrete overpass structure
  [TileType.Fence]: '#525252',                // A simple dividing fence
  [TileType.PowerLines]: '#A1A1AA',            // Muted metal for pylons
  [TileType.Pipeline]: '#F59E0B',              // Industrial pipeline
  [TileType.AirportRunway]: '#27272A',        // Dark runway tarmac
  [TileType.Heliport]: '#3F3F46',            // Helipad marking
  [TileType.SubwayEntrance]: '#0891B2',      // Urban transit entrance

  // --- Buildings: Residential (250-299) ---
  [TileType.BuildingResidentialLow]: '#FB923C',   // Warm orange for houses/villas
  [TileType.BuildingResidentialMid]: '#F97316',   // Deeper orange for apartments
  [TileType.BuildingResidentialHigh]: '#EA580C',  // Intense orange for high-rises
  [TileType.BuildingShack]: '#7F5539',            // Weathered, rough wood
  [TileType.BuildingManor]: '#FCE7F3',            // Pale pink, stately home
  [TileType.BuildingPalace]: '#FCD34D',           // A bright, golden palace
  [TileType.BuildingTenement]: '#7C2D12',        // Dark, aged brick

  // --- Buildings: Commercial (300-349) ---
  [TileType.BuildingCommercialLow]: '#818CF8',    // Light indigo for shops/markets
  [TileType.BuildingCommercialMid]: '#6366F1',    // Brighter indigo for offices/malls
  [TileType.BuildingCommercialHigh]: '#4F46E5',   // Deep indigo for corporate towers
  [TileType.BuildingMarketStall]: '#A78BFA',      // A colorful market stall
  [TileType.BuildingInn]: '#D946EF',              // A welcoming fuchsia
  [TileType.BuildingBank]: '#22D3EE',              // A cool, secure cyan
  [TileType.BuildingSkyscraper]: '#E0F2FE',      // A light blue for glass towers

  // --- Buildings: Industrial & Utility (350-399) ---
  [TileType.BuildingIndustrialFactory]: '#78716C', // Sooty, industrial stone
  [TileType.BuildingIndustrialWarehouse]: '#A8A29E',// Plain concrete warehouse
  [TileType.HarborDocks]: '#57534E',              // Weathered wood and stone docks
  [TileType.Mine]: '#44403C',                      // Dark mine entrance
  [TileType.PowerPlant]: '#EF4444',              // Red accent for power/danger
  [TileType.LumberMill]: '#854D0E',              // Processed wood and sawdust
  [TileType.Quarry]: '#D6D3D1',                  // Excavated light stone
  [TileType.OilDerrick]: '#1E293B',              // Dark, oily steel
  [TileType.HydroelectricDam]: '#94A3B8',        // Massive concrete dam
  [TileType.WindTurbine]: '#F0FDFA',              // Clean, white turbine
  [TileType.SolarFarm]: '#0F172A',                // Dark photovoltaic cells
  [TileType.RecyclingPlant]: '#16A34A',          // "Green" for recycling

  // --- Buildings: Civic, Military, & Special (400-449) ---
  [TileType.BuildingTownHall]: '#F3F4F6',         // White marble or limestone
  [TileType.BuildingHospital]: '#FCA5A5',         // Pale red/white for medical
  [TileType.BuildingSchool]: '#FDBA74',           // Welcoming, light orange
  [TileType.BuildingLibrary]: '#6EE7B7',         // Calm, studious green
  [TileType.BuildingMuseum]: '#BAE6FD',           // Open, airy light blue
  [TileType.BuildingWatchtower]: '#404040',     // Dark stone/wood watchtower
  [TileType.BuildingBarracks]: '#4D7C0F',         // Olive drab for military housing
  [TileType.BuildingFortress]: '#52525B',        // Solid, defensive gray
  [TileType.BuildingStadium]: '#E879F9',         // A vibrant, exciting color
  [TileType.BuildingTheater]: '#9333EA',         // Rich, dramatic purple

  // --- Landmarks & Ruins (450-499) ---
  [TileType.Ruins]: '#BCA58C',                   // Weathered, sandy stone
  [TileType.Monument]: '#F5F5F4',                 // Polished white marble
  [TileType.Castle]: '#9CA3AF',                   // Standard gray castle stone
  [TileType.Lighthouse]: '#DC2626',               // Classic red and white
  [TileType.Graveyard]: '#374151',               // Somber, dark gray
  [TileType.Pyramid]: '#FCD34D',                 // Golden sandstone
  [TileType.Monolith]: '#111827',                 // A mysterious, black monolith
  [TileType.Shipwreck]: '#57534E',               // Waterlogged, dark wood
  [TileType.AncientBattlefield]: '#7F1D1D',     // Blood-soaked earth

  // --- Sci-Fi & Fantasy (500-549) ---
  [TileType.FloatingIsland]: '#A5B4FC',        // Ethereal, light island color
  [TileType.MagicPortal]: '#D946EF',          // A shimmering, magical portal
  [TileType.EnchantedForest]: '#8B5CF6',      // A forest imbued with purple magic
  [TileType.CrystalSpires]: '#67E8F9',        // Translucent, glowing cyan crystals
  [TileType.AlienStructure]: '#34D399',      // Non-terrestrial, strange green
  [TileType.CrashedSpaceship]: '#4B5563',      // Burnt, salvaged metal
  [TileType.ForceFieldGenerator]: '#3B82F6',  // A shimmering blue energy
  [TileType.TeleporterPad]: '#EC4899',         // A vibrant, high-tech pink
  [TileType.DomeCityFragment]: '#E5E7EB',      // A clean, sterile white dome

  // --- Overlays & Effects (900+) ---
  [TileType.Fire]: '#FF0000',                 // A pure, vibrant red for active fire
  [TileType.NeonGlow]: '#EC4899',             // A bright, cyberpunk pink glow
  [TileType.Flood]: '#93C5FD',                // A semi-transparent light blue
  [TileType.Mist]: '#E5E7EB',                 // A thick, obscuring white fog
  [TileType.Contamination]: '#84CC16',      // A sickly, radioactive green
  [TileType.Blessed]: '#FEF08A',              // A holy, golden shimmer
  [TileType.Cursed]: '#7E22CE',                // A dark, purple magical blight
  [TileType.ScorchMark]: '#27272A',            // A black burn mark on the ground
};


export function initializeCanvas(context: CanvasRenderingContext2D) {
  context.fillStyle = TILE_COLOR_MAP[TileType.Empty];
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

export function drawPatches(context: CanvasRenderingContext2D, patches: TilePatch[]) {
  patches.forEach(patch => {
    context.fillStyle = TILE_COLOR_MAP[patch.tileType] || TILE_COLOR_MAP[TileType.Empty];
    context.fillRect(
      patch.x * TILE_SIZE,
      patch.y * TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE
    );
  });
}

export function drawPatch(context: CanvasRenderingContext2D, patch: TilePatch){
    context.fillStyle = TILE_COLOR_MAP[patch.tileType] || TILE_COLOR_MAP[TileType.Empty];
    context.fillRect(
      patch.x * TILE_SIZE,
      patch.y * TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE
    );
}

