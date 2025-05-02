'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Bot, Settlement, SettlementExpansionSuggestion } from '@/lib/types';
import SettlementOverview from '@/components/settlement-overview';
import BotStatusCard from '@/components/bot-status-card';
import SettlementExpansionPanel from '@/components/settlement-expansion-panel';
import BotSummaryDialog from '@/components/bot-summary-dialog'; // Import the dialog
import { summarizeBotActivity } from '@/ai/flows/summarize-bot-activity';
import { suggestSettlementExpansion } from '@/ai/flows/suggest-settlement-expansion';
import { getBotInventory, getNearbyEntities, moveBotTo, setBlockAtPosition, transferItems, getBlockAtPosition } from '@/services/minecraft'; // Assuming these exist and are usable client-side for demo
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';


// Mock Minecraft data (replace with actual API calls)
const mockBots: Bot[] = [
  { id: 'bot1', name: 'BuilderBot Alpha', health: 85, hunger: 60, role: 'builder', inventory: [{ name: 'cobblestone', quantity: 64 }, { name: 'oak_planks', quantity: 32 }], position: { x: 10, y: 64, z: 20 }, currentAction: 'Building house frame' },
  { id: 'bot2', name: 'FarmerBot Beta', health: 95, hunger: 40, role: 'farmer', inventory: [{ name: 'wheat_seeds', quantity: 128 }, { name: 'wheat', quantity: 45 }], position: { x: 5, y: 64, z: 15 }, currentAction: 'Harvesting wheat' },
  { id: 'bot3', name: 'MinerBot Gamma', health: 70, hunger: 80, role: 'miner', inventory: [{ name: 'iron_ore', quantity: 15 }, { name: 'coal', quantity: 50 }, { name: 'stone_pickaxe', quantity: 1 }], position: { x: -10, y: 40, z: 30 }, currentAction: 'Mining for iron' },
  { id: 'bot4', name: 'WarriorBot Delta', health: 100, hunger: 50, role: 'warrior', inventory: [{ name: 'iron_sword', quantity: 1 }, { name: 'shield', quantity: 1 }, { name: 'cooked_beef', quantity: 8 }], position: { x: 15, y: 65, z: 25 }, currentAction: 'Patrolling perimeter' },
   { id: 'bot5', name: 'IdleBot Epsilon', health: 90, hunger: 90, role: 'idle', inventory: [], position: { x: 12, y: 64, z: 22 } },
];

const mockSettlement: Settlement = {
  name: 'Oakwood Village',
  size: 5, // Number of structures
  resources: [
    { name: 'wood', quantity: 256 },
    { name: 'stone', quantity: 512 },
    { name: 'iron_ingot', quantity: 30 },
    { name: 'wheat', quantity: 120 },
    { name: 'coal', quantity: 150 },
  ],
  bots: mockBots,
};

export default function Home() {
  const [settlement, setSettlement] = useState<Settlement | null>(null);
  const [isLoadingSettlement, setIsLoadingSettlement] = useState(true);
  const [expansionSuggestion, setExpansionSuggestion] = useState<SettlementExpansionSuggestion | null>(null);
  const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);
  const [selectedBotId, setSelectedBotId] = useState<string | null>(null);
  const [botSummary, setBotSummary] = useState<string | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [isSummaryDialogOpen, setIsSummaryDialogOpen] = useState(false);

  const { toast } = useToast();

  // Fetch initial settlement data
  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      setSettlement(mockSettlement);
      setIsLoadingSettlement(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleGenerateSuggestion = useCallback(async () => {
    if (!settlement) return;
    setIsLoadingSuggestion(true);
    setExpansionSuggestion(null); // Clear previous suggestion

    try {
      const input = {
        availableResources: settlement.resources,
        botRoles: settlement.bots.map(b => b.role),
        currentSettlementSize: settlement.size,
        // Using a fixed player position for demo, replace with actual player data if available
        playerPosition: { x: 0, y: 65, z: 0 },
      };
      const suggestion = await suggestSettlementExpansion(input);
      setExpansionSuggestion(suggestion);
      toast({ title: "Expansion suggestion generated successfully!" });
    } catch (error) {
      console.error("Error generating settlement expansion suggestion:", error);
      toast({ title: "Error Generating Suggestion", description: "Could not get expansion suggestions.", variant: "destructive" });
    } finally {
      setIsLoadingSuggestion(false);
    }
  }, [settlement, toast]);

   const handleSummarizeBot = useCallback(async (botId: string) => {
    setSelectedBotId(botId);
    setIsLoadingSummary(true);
    setBotSummary(null);
    setIsSummaryDialogOpen(true); // Open the dialog

    try {
      const result = await summarizeBotActivity({ botId });
      setBotSummary(result.summary);
    } catch (error) {
      console.error("Error summarizing bot activity:", error);
      setBotSummary("Error loading summary.");
      toast({ title: "Error Summarizing Bot", description: "Could not get bot summary.", variant: "destructive" });
    } finally {
      setIsLoadingSummary(false);
    }
  }, [toast]);


  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-12 bg-background text-foreground">
      <div className="w-full max-w-7xl space-y-8">
        {/* Header or Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-primary mb-8">
          BotLife: AI Minecraft Society
        </h1>

        {/* Settlement Overview */}
         {isLoadingSettlement ? (
           <Skeleton className="h-64 w-full" />
         ) : settlement ? (
          <SettlementOverview settlement={settlement} />
         ) : (
           <p>No settlement data available.</p>
         )}


        {/* Bot Status Grid */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Bot Population</h2>
          {isLoadingSettlement ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
               {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-80 w-full" />)}
            </div>
          ) : settlement && settlement.bots.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {settlement.bots.map((bot) => (
                <BotStatusCard key={bot.id} bot={bot} onSummarizeClick={handleSummarizeBot} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No bots found in the settlement.</p>
          )}
        </section>

        {/* Expansion Suggestions */}
        <section>
           {isLoadingSettlement ? (
              <Skeleton className="h-96 w-full" />
           ) : (
               <SettlementExpansionPanel
                suggestion={expansionSuggestion}
                isLoading={isLoadingSuggestion}
                onGenerateSuggestion={handleGenerateSuggestion}
                />
           )}

        </section>

        {/* Bot Summary Dialog */}
        <BotSummaryDialog
          botName={settlement?.bots.find(b => b.id === selectedBotId)?.name || null}
          summary={botSummary}
          isLoading={isLoadingSummary}
          isOpen={isSummaryDialogOpen}
          onOpenChange={setIsSummaryDialogOpen}
        />
      </div>
    </main>
  );
}
