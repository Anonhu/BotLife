import type { FC } from 'react';
import type { Settlement } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Building2, Package, Bot as BotIcon } from 'lucide-react'; // Renamed Bot icon import

interface SettlementOverviewProps {
  settlement: Settlement;
}

const SettlementOverview: FC<SettlementOverviewProps> = ({ settlement }) => {
  const totalBots = settlement.bots.length;
  const roleCounts = settlement.bots.reduce((acc, bot) => {
    acc[bot.role] = (acc[bot.role] || 0) + 1;
    return acc;
  }, {} as Record<Settlement['bots'][number]['role'], number>);


  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          {settlement.name} Overview
        </CardTitle>
        <CardDescription>Current status of the settlement and its resources.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm">
           <span className="flex items-center gap-1"><BotIcon className="h-4 w-4"/> Bots: <Badge variant="outline">{totalBots}</Badge></span>
           <span className="flex items-center gap-1"><Building2 className="h-4 w-4"/> Size: <Badge variant="outline">{settlement.size} Structures</Badge></span>
        </div>

         <div>
           <h4 className="text-base font-medium mb-2">Bot Roles</h4>
           <div className="flex flex-wrap gap-2">
             {Object.entries(roleCounts).map(([role, count]) => (
               <Badge key={role} variant="secondary" className="capitalize">{role}: {count}</Badge>
             ))}
              {totalBots === 0 && <p className="text-sm text-muted-foreground italic">No bots assigned.</p>}
           </div>
         </div>


        <div>
          <h4 className="text-base font-medium mb-2 flex items-center gap-1"><Package className="h-4 w-4 text-primary"/> Resources</h4>
          <ScrollArea className="h-40 w-full rounded-md border p-3">
            {settlement.resources.length > 0 ? (
              <ul className="text-sm space-y-1">
                {settlement.resources.map((item) => (
                  <li key={item.name} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>x{item.quantity}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground italic">No resources stored.</p>
            )}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettlementOverview;
