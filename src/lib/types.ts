// Reusing types from minecraft service where applicable and adding new ones

export interface Item {
  name: string;
  quantity: number;
}

export type BotRole = 'builder' | 'farmer' | 'miner' | 'warrior' | 'idle';

export interface Bot {
  id: string;
  name: string;
  health: number; // e.g., 0-100
  hunger: number; // e.g., 0-100
  role: BotRole;
  inventory: Item[];
  position: { x: number; y: number; z: number };
  currentAction?: string; // e.g., "Mining Stone", "Building House"
}

export interface StructureSuggestion {
  type: string; // e.g., house, farm, mine
  priority: 'high' | 'medium' | 'low';
  location: { x: number; y: number; z: number };
  requiredResources: Item[];
}

export interface SettlementExpansionSuggestion {
  expansionPlan: string;
  suggestedStructures: StructureSuggestion[];
}

export interface Settlement {
  name: string;
  size: number; // Number of structures or area
  resources: Item[];
  bots: Bot[];
  // Add other relevant settlement data if needed
}

// For AI function inputs/outputs if they differ slightly or need refinement
export type SummarizeBotActivityInput = {
  botId: string;
};

export type SummarizeBotActivityOutput = {
  summary: string;
};

export type SuggestSettlementExpansionInput = {
  availableResources: Item[];
  botRoles: BotRole[];
  currentSettlementSize: number;
  playerPosition: { x: number; y: number; z: number };
};

export type SuggestSettlementExpansionOutput = SettlementExpansionSuggestion;
