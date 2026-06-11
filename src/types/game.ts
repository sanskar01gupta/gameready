export interface Game {
  id: string;
  slug: string;
  title: string;
  developer: string | null;
  publisher: string | null;
  releaseDate: string | null;
  genres: string[];
  description: string | null;
  coverImageUrl: string | null;
  bannerImageUrl: string | null;
  steamId: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export type RequirementTier = "minimum" | "recommended" | "ultra";

export interface GameRequirement {
  id: string;
  gameId: string;
  tier: RequirementTier;
  cpuMin: string | null;
  cpuRecommended: string | null;
  cpuNotes: string | null;
  gpuMin: string | null;
  gpuRecommended: string | null;
  gpuNotes: string | null;
  gpuVramMinGb: number | null;
  gpuVramRecommendedGb: number | null;
  ramMinGb: number;
  ramRecommendedGb: number | null;
  storageMinGb: number | null;
  storageRecommendedGb: number | null;
  storageType: string | null;
  osRequired: string | null;
  osVersionMin: string | null;
  directxVersion: string | null;
  apiRequired: string | null;
  additionalNotes: string | null;
  fpsTarget: string | null;
}

export interface GameWithRequirements extends Game {
  requirements: {
    minimum: GameRequirement | null;
    recommended: GameRequirement | null;
    ultra: GameRequirement | null;
  };
}

export interface GameListItem {
  id: string;
  slug: string;
  title: string;
  coverImageUrl: string | null;
  genres: string[];
  releaseDate: string | null;
  developer: string | null;
}
