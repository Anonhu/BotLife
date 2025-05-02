'use server';
/**
 * @fileOverview A flow to summarize recent bot activities and resource changes.
 *
 * - summarizeBotActivity - A function that summarizes bot activity.
 * - SummarizeBotActivityInput - The input type for the summarizeBotActivity function.
 * - SummarizeBotActivityOutput - The return type for the summarizeBotActivity function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SummarizeBotActivityInputSchema = z.object({
  botId: z.string().describe('The ID of the bot to summarize activity for.'),
});
export type SummarizeBotActivityInput = z.infer<typeof SummarizeBotActivityInputSchema>;

const SummarizeBotActivityOutputSchema = z.object({
  summary: z.string().describe('A summary of recent bot activities and resource changes.'),
});
export type SummarizeBotActivityOutput = z.infer<typeof SummarizeBotActivityOutputSchema>;

export async function summarizeBotActivity(input: SummarizeBotActivityInput): Promise<SummarizeBotActivityOutput> {
  return summarizeBotActivityFlow(input);
}

const summarizeBotActivityPrompt = ai.definePrompt({
  name: 'summarizeBotActivityPrompt',
  input: {
    schema: z.object({
      botId: z.string().describe('The ID of the bot to summarize activity for.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A summary of recent bot activities and resource changes.'),
    }),
  },
  prompt: `Summarize the recent activities and resource changes for bot with ID {{{botId}}}. Focus on providing a concise overview of the bot's contributions to the settlement.`, // eslint-disable-line max-len
});

const summarizeBotActivityFlow = ai.defineFlow<
  typeof SummarizeBotActivityInputSchema,
  typeof SummarizeBotActivityOutputSchema
>({
  name: 'summarizeBotActivityFlow',
  inputSchema: SummarizeBotActivityInputSchema,
  outputSchema: SummarizeBotActivityOutputSchema,
},
async input => {
  const {output} = await summarizeBotActivityPrompt(input);
  return output!;
});
