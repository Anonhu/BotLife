import type { FC } from 'react';
import type { SettlementExpansionSuggestion, Item } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Bot, Lightbulb, MapPin, Package, ArrowRight } from 'lucide-react'; // Bot is used for AI suggestions
import { Button } from './ui/button';

interface SettlementExpansionPanelProps {
  suggestion: SettlementExpansionSuggestion | null;
  isLoading: boolean;
  onGenerateSuggestion: () => void;
}

const ResourceList: FC<{ resources: Item[] }> = ({ resources }) => (
  <ul className="text-xs list-disc list-inside space-y-1">
    {resources.map(item => (
      <li key={item.name}>{item.name}: {item.quantity}</li>
    ))}
    {resources.length === 0 && <li className="italic">None specified</li>}
  </ul>
);

const SettlementExpansionPanel: FC<SettlementExpansionPanelProps> = ({ suggestion, isLoading, onGenerateSuggestion }) => {
  return (
    <Card className="w-full shadow-md">
      <CardHeader>
         <div className="flex justify-between items-center">
            <CardTitle className="text-xl flex items-center gap-2">
             <Lightbulb className="h-5 w-5 text-primary" />
             AI Expansion Suggestions
            </CardTitle>
           <Button onClick={onGenerateSuggestion} disabled={isLoading} size="sm">
              {isLoading ? 'Generating...' : 'Generate New Suggestion'}
           </Button>
         </div>

        <CardDescription>AI-powered recommendations for growing your settlement.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <p className="text-muted-foreground">Loading suggestions...</p>}
        {!isLoading && !suggestion && <p className="text-muted-foreground">Click 'Generate' to get expansion ideas.</p>}
        {suggestion && (
          <div className="space-y-4">
            <div>
              <h4 className="text-base font-medium mb-2 flex items-center gap-1">
                <Bot className="h-4 w-4 text-primary"/> Overall Plan
              </h4>
              <p className="text-sm text-muted-foreground">{suggestion.expansionPlan}</p>
            </div>

            <div>
              <h4 className="text-base font-medium mb-2">Suggested Structures</h4>
              {suggestion.suggestedStructures.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {suggestion.suggestedStructures.map((structure, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-sm hover:no-underline">
                        <div className="flex items-center gap-2 w-full justify-between pr-2">
                           <span className="font-medium capitalize">{structure.type}</span>
                           <Badge variant={structure.priority === 'high' ? 'destructive' : structure.priority === 'medium' ? 'default' : 'outline'} className="capitalize mr-auto ml-2">
                             Priority: {structure.priority}
                           </Badge>
                           <span className="text-xs text-muted-foreground flex items-center gap-1">
                             <MapPin className="h-3 w-3"/> {structure.location.x}, {structure.location.y}, {structure.location.z}
                           </span>
                        </div>

                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground px-2">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <strong className="flex items-center gap-1 mb-1"><Package className="h-3 w-3 text-primary"/> Required Resources:</strong>
                                <ResourceList resources={structure.requiredResources} />
                            </div>
                             {/* Placeholder for potential actions like 'Assign Builder Bot' */}
                             {/* <Button variant="outline" size="sm">Assign Bot</Button> */}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                 <p className="text-sm text-muted-foreground italic">No specific structures suggested currently.</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SettlementExpansionPanel;
