import type { Block, Item, Entity, Position, BotRole } from '@/lib/types'; // Use types from lib/types

/**
 * Represents a Minecraft block.
 */
// Using Block type from lib/types

/**
 * Represents a Minecraft item.
 */
// Using Item type from lib/types

/**
 * Represents a Minecraft entity.
 */
// Using Entity type from lib/types

/**
 * Represents a three-dimensional position in the Minecraft world.
 */
// Using Position type from lib/types

/**
 * Asynchronously retrieves the block at a given position.
 *
 * @param position The position to check.
 * @returns A promise that resolves to a Block object or null if air.
 */
export async function getBlockAtPosition(position: Position): Promise<Block | null> {
  // TODO: Implement this by calling the Minecraft API (e.g., Bukkit/Spigot).
  console.log(`[MC Service Mock] Getting block at ${position.x}, ${position.y}, ${position.z}`);
  // Simulate finding grass sometimes
   if (Math.random() < 0.7) {
    return { type: 'grass_block' };
   } else if (Math.random() < 0.9) {
    return { type: 'stone' };
   }
  return null; // Simulate air block
}

/**
 * Asynchronously sets the block at a given position.
 *
 * @param position The position to set the block at.
 * @param block The block to set. Use null to set to air.
 * @returns A promise that resolves when the block has been set.
 */
export async function setBlockAtPosition(position: Position, block: Block | null): Promise<void> {
  // TODO: Implement this by calling the Minecraft API.
  console.log(`[MC Service Mock] Setting block at ${position.x}, ${position.y}, ${position.z} to ${block?.type ?? 'air'}`);
  await new Promise(resolve => setTimeout(resolve, 50)); // Simulate delay
}

/**
 * Asynchronously gets the items in a bot's inventory.
 *
 * @param botId The ID of the bot.
 * @returns A promise that resolves to an array of Item objects.
 */
export async function getBotInventory(botId: string): Promise<Item[]> {
  // TODO: Implement this by calling the Minecraft API/Plugin.
  console.log(`[MC Service Mock] Getting inventory for bot ${botId}`);
   // Find the mock bot and return its inventory (or default if not found)
   const bot = (await getSettlementData()).bots.find(b => b.id === botId); // Simulate fetching
   return bot?.inventory || [
     { name: 'dirt', quantity: Math.floor(Math.random() * 10) },
     { name: 'stick', quantity: Math.floor(Math.random() * 5) },
   ];
}

/**
 * Asynchronously transfers items between a bot and a position (e.g., a chest).
 *
 * @param botId The ID of the bot.
 * @param position The position of the container (e.g., chest) to transfer items to/from.
 * @param item The item to transfer.
 * @param quantity The quantity of the item to transfer. Positive to add to container, negative to take from container.
 * @returns A promise that resolves when the items have been transfered.
 */
export async function transferItems(botId: string, position: Position, item: Item, quantity: number): Promise<void> {
  // TODO: Implement this by calling the Minecraft API/Plugin.
  const direction = quantity > 0 ? 'to' : 'from';
  const absQuantity = Math.abs(quantity);
  console.log(`[MC Service Mock] Bot ${botId} transferring ${absQuantity} ${item.name} ${direction} container at ${position.x}, ${position.y}, ${position.z}`);
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate delay
}

/**
 * Asynchronously moves a bot to a given position.
 *
 * @param botId The ID of the bot.
 * @param position The position to move the bot to.
 * @returns A promise that resolves when the bot has reached the destination or started moving.
 */
export async function moveBotTo(botId: string, position: Position): Promise<void> {
  // TODO: Implement this by calling the Minecraft API/Plugin.
  console.log(`[MC Service Mock] Moving bot ${botId} to ${position.x}, ${position.y}, ${position.z}`);
  // Update mock bot position (important for demos)
  const settlement = await getSettlementData(); // Simulate fetching latest data
  const botIndex = settlement.bots.findIndex(b => b.id === botId);
  if (botIndex > -1) {
      settlement.bots[botIndex].position = position;
      // In a real scenario, this update would happen via events from Minecraft
  }

  await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300)); // Simulate variable movement time
}

/**
 * Asynchronously gets the entities within a radius of a position.
 *
 * @param position The position to check.
 * @param radius The radius to check.
 * @returns A promise that resolves to an array of Entity objects.
 */
export async function getNearbyEntities(position: Position, radius: number): Promise<Entity[]> {
  // TODO: Implement this by calling the Minecraft API.
  console.log(`[MC Service Mock] Getting entities near ${position.x}, ${position.y}, ${position.z} (radius ${radius})`);
  const entities: Entity[] = [];
  if (Math.random() < 0.3) {
    entities.push({ type: 'Zombie', health: Math.floor(Math.random() * 15 + 5) });
  }
  if (Math.random() < 0.5) {
     entities.push({ type: 'Cow', health: 10 });
  }
   if (Math.random() < 0.2) {
     entities.push({ type: 'Skeleton', health: Math.floor(Math.random() * 15 + 5) });
   }
  return entities;
}


// --- New Mock Functions for BotLife ---

/**
 * Represents the full settlement state.
 */
export interface SettlementData {
    name: string;
    size: number;
    resources: Item[];
    bots: {
        id: string;
        name: string;
        health: number;
        hunger: number;
        role: BotRole;
        inventory: Item[];
        position: Position;
        currentAction?: string;
    }[];
}

// In-memory store for the mock settlement data
let currentSettlementData: SettlementData = {
  name: 'Oakwood Village',
  size: 5,
  resources: [
    { name: 'oak_log', quantity: 256 },
    { name: 'cobblestone', quantity: 512 },
    { name: 'iron_ingot', quantity: 30 },
    { name: 'wheat', quantity: 120 },
    { name: 'coal', quantity: 150 },
  ],
  bots: [
    { id: 'bot1', name: 'BuilderBot Alpha', health: 85, hunger: 60, role: 'builder', inventory: [{ name: 'cobblestone', quantity: 64 }, { name: 'oak_planks', quantity: 32 }], position: { x: 10, y: 64, z: 20 }, currentAction: 'Building house frame' },
    { id: 'bot2', name: 'FarmerBot Beta', health: 95, hunger: 40, role: 'farmer', inventory: [{ name: 'wheat_seeds', quantity: 128 }, { name: 'wheat', quantity: 45 }], position: { x: 5, y: 64, z: 15 }, currentAction: 'Harvesting wheat' },
    { id: 'bot3', name: 'MinerBot Gamma', health: 70, hunger: 80, role: 'miner', inventory: [{ name: 'iron_ore', quantity: 15 }, { name: 'coal', quantity: 50 }, { name: 'stone_pickaxe', quantity: 1 }], position: { x: -10, y: 40, z: 30 }, currentAction: 'Mining for iron' },
    { id: 'bot4', name: 'WarriorBot Delta', health: 100, hunger: 50, role: 'warrior', inventory: [{ name: 'iron_sword', quantity: 1 }, { name: 'shield', quantity: 1 }, { name: 'cooked_beef', quantity: 8 }], position: { x: 15, y: 65, z: 25 }, currentAction: 'Patrolling perimeter' },
    { id: 'bot5', name: 'IdleBot Epsilon', health: 90, hunger: 90, role: 'idle', inventory: [], position: { x: 12, y: 64, z: 22 } },
  ],
};


/**
 * Asynchronously gets the current state of the settlement.
 * In a real plugin, this would query the game state.
 *
 * @returns A promise that resolves to the SettlementData object.
 */
export async function getSettlementData(): Promise<SettlementData> {
    console.log('[MC Service Mock] Getting settlement data');
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 50));
    // Return a deep copy to prevent accidental modification of the mock store
    return JSON.parse(JSON.stringify(currentSettlementData));
}

/**
 * Updates the role of a specific bot.
 *
 * @param botId The ID of the bot to update.
 * @param newRole The new role to assign.
 * @returns A promise that resolves when the role is updated.
 */
export async function updateBotRole(botId: string, newRole: BotRole): Promise<void> {
    console.log(`[MC Service Mock] Updating role for bot ${botId} to ${newRole}`);
    const botIndex = currentSettlementData.bots.findIndex(b => b.id === botId);
    if (botIndex > -1) {
        currentSettlementData.bots[botIndex].role = newRole;
    }
    await new Promise(resolve => setTimeout(resolve, 30));
}

/**
 * Updates the current action displayed for a bot.
 *
 * @param botId The ID of the bot to update.
 * @param actionDescription The description of the current action.
 * @returns A promise that resolves when the action is updated.
 */
export async function updateBotAction(botId: string, actionDescription: string): Promise<void> {
    // console.log(`[MC Service Mock] Updating action for bot ${botId} to "${actionDescription}"`);
    const botIndex = currentSettlementData.bots.findIndex(b => b.id === botId);
    if (botIndex > -1) {
        currentSettlementData.bots[botIndex].currentAction = actionDescription;
    }
    // No delay for this as it's just status text
}


// Simulate some background activity (e.g., hunger decay, resource gathering)
// In a real app, this logic would be driven by the Minecraft plugin/server events.
setInterval(() => {
    currentSettlementData.bots.forEach(bot => {
        if (bot.hunger > 0) bot.hunger = Math.max(0, bot.hunger - 1);
        if (bot.hunger < 20 && bot.health > 0) bot.health = Math.max(0, bot.health - 1); // Starvation

        // Simulate actions
        if (bot.role === 'miner' && Math.random() < 0.1) {
             const ore = Math.random() < 0.3 ? 'iron_ore' : 'coal';
             const invItem = bot.inventory.find(i => i.name === ore);
             if(invItem) invItem.quantity++; else bot.inventory.push({ name: ore, quantity: 1});
             updateBotAction(bot.id, `Mining ${ore}`);
        } else if (bot.role === 'farmer' && Math.random() < 0.15) {
             const invItem = bot.inventory.find(i => i.name === 'wheat');
             if(invItem) invItem.quantity++; else bot.inventory.push({ name: 'wheat', quantity: 1});
              updateBotAction(bot.id, `Harvesting wheat`);
        } else if (bot.role === 'builder' && Math.random() < 0.05) {
             updateBotAction(bot.id, `Constructing wall section`);
        } else if (bot.role === 'warrior' && Math.random() < 0.02) {
             updateBotAction(bot.id, `Scanning for threats`);
        } else if (bot.role === 'idle' && Math.random() < 0.1) {
             updateBotAction(bot.id, `Wandering aimlessly`);
        }

    });
    // console.log('[MC Service Mock] Simulated background activity tick');
}, 5000); // Run every 5 seconds


