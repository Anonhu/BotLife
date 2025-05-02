// @fileOverview Settlement expansion suggestion AI agent.
//
// - suggestSettlementExpansion - A function that suggests settlement expansion plans based on the current resources and bot roles.
// - SuggestSettlementExpansionInput - The input type for the suggestSettlementExpansion function.
// - SuggestSettlementExpansionOutput - The return type for the suggestSettlementExpansion function.

'use server';

import {ai} from '@/ai/ai-instance';
import {Block, Item, Position} from '@/services/minecraft';
import {z} from 'genkit';

const SuggestSettlementExpansionInputSchema = z.object({
  availableResources: z
    .array(
      z.object({
        name: z.string().describe('The name of the resource.'),
        quantity: z.number().describe('The quantity of the resource.'),
      })
    )
    .describe('The resources available to the settlement.'),
  botRoles: z
    .array(z.string().describe('The roles of the bots in the settlement (e.g., builder, farmer, miner, warrior).'))
    .describe('The roles of the bots in the settlement.'),
  currentSettlementSize: z.number().describe('The current size of the settlement (number of structures).'),
  playerPosition: z.object({
        x: z.number(),
        y: z.number(),
        z: z.number(),
      }).describe('The player position in the world.')
});
export type SuggestSettlementExpansionInput = z.infer<typeof SuggestSettlementExpansionInputSchema>;

const SuggestSettlementExpansionOutputSchema = z.object({
  expansionPlan: z.string().describe('A detailed plan for expanding the settlement, including specific projects and resource allocation.'),
  suggestedStructures: z
    .array(
      z.object({
        type: z.string().describe('The type of structure to build (e.g., house, farm, mine).'),
        priority: z.string().describe('Priority of building the structure. Either "high", "medium" or "low"'),
        location: z.object({
          x: z.number().describe('The X coordinate.'),
          y: z.number().describe('The Y coordinate.'),
          z: z.number().describe('The Z coordinate.'),
        }).describe('The location to build the structure.'),
        requiredResources: z
          .array(
            z.object({
              name: z.string().describe('The name of the resource.'),
              quantity: z.number().describe('The quantity of the resource required.'),
            })
          )
          .describe('The resources required to build the structure.'),
      })
    )
    .describe('A list of suggested structures to build.'),
});
export type SuggestSettlementExpansionOutput = z.infer<typeof SuggestSettlementExpansionOutputSchema>;

export async function suggestSettlementExpansion(input: SuggestSettlementExpansionInput): Promise<SuggestSettlementExpansionOutput> {
  return suggestSettlementExpansionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSettlementExpansionPrompt',
  input: {
    schema: z.object({
      availableResources: z
        .array(
          z.object({
            name: z.string().describe('The name of the resource.'),
            quantity: z.number().describe('The quantity of the resource.'),
          })
        )
        .describe('The resources available to the settlement.'),
      botRoles: z
        .array(z.string().describe('The roles of the bots in the settlement (e.g., builder, farmer, miner, warrior).'))
        .describe('The roles of the bots in the settlement.'),
      currentSettlementSize: z.number().describe('The current size of the settlement (number of structures).'),
      playerPosition: z.object({
        x: z.number(),
        y: z.number(),
        z: z.number(),
      }).describe('The player position in the world.')
    }),
  },
  output: {
    schema: z.object({
      expansionPlan: z.string().describe('A detailed plan for expanding the settlement, including specific projects and resource allocation.'),
      suggestedStructures: z
        .array(
          z.object({
            type: z.string().describe('The type of structure to build (e.g., house, farm, mine).'),
            priority: z.string().describe('Priority of building the structure. Either "high", "medium" or "low"'),
            location: z.object({
              x: z.number().describe('The X coordinate.'),
              y: z.number().describe('The Y coordinate.'),
              z: z.number().describe('The Z coordinate.'),
            }).describe('The location to build the structure.'),
            requiredResources: z
              .array(
                z.object({
                  name: z.string().describe('The name of the resource.'),
                  quantity: z.number().describe('The quantity of the resource required.'),
                })
              )
              .describe('The resources required to build the structure.'),
          })
        )
        .describe('A list of suggested structures to build.'),
    }),
  },
  prompt: `You are an expert settlement planner in Minecraft.

You will suggest how to optimally expand a settlement based on the available resources, bot roles, current settlement size and player position.

Available Resources:
{{#each availableResources}}
  - {{this.name}}: {{this.quantity}}
{{/each}}

Bot Roles:
{{#each botRoles}}
  - {{this}}
{{/each}}

Current Settlement Size: {{currentSettlementSize}}
Player position: {{playerPosition.x}}, {{playerPosition.y}}, {{playerPosition.z}}

Based on this information, provide a detailed expansion plan and suggest specific structures to build, including their priority, location and required resources.
`,
});

const suggestSettlementExpansionFlow = ai.defineFlow<
  typeof SuggestSettlementExpansionInputSchema,
  typeof SuggestSettlementExpansionOutputSchema
>(
  {
    name: 'suggestSettlementExpansionFlow',
    inputSchema: SuggestSettlementExpansionInputSchema,
    outputSchema: SuggestSettlementExpansionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
