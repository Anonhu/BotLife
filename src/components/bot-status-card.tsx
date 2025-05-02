import type { FC } from 'react';
import type { Bot, Item } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Heart, Beef, Hammer, Tractor, Pickaxe, Swords, HelpCircle, Package } from 'lucide-react';

interface BotStatusCardProps {
  bot: Bot;
  onSummarizeClick?: (botId: string) => void;
}

const RoleIcon: FC<{ role: Bot['role'] }> = ({ role }) => {
  switch (role) {
    case 'builder': return <Hammer className="h-4 w-4 text-primary" />;
    case 'farmer': return <Tractor className="h-4 w-4 text-primary" />;
    case 'miner': return <Pickaxe className="h-4 w-4 text-primary" />;
    case 'warrior': return <Swords className="h-4 w-4 text-primary" />;
    default: return <HelpCircle className="h-4 w-4 text-muted-foreground" />;
  }
};

const BotStatusCard: FC<BotStatusCardProps> = ({ bot, onSummarizeClick }) => {
  return (
    <Card className="w-full max-w-sm shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer" onClick={() => onSummarizeClick?.(bot.id)}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{bot.name} (ID: {bot.id})</CardTitle>
          <Badge variant="secondary" className="capitalize flex items-center gap-1">
             <RoleIcon role={bot.role} />
             {bot.role}
           </Badge>
        </div>
        <CardDescription>Current Action: {bot.currentAction || 'Idle'}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1 text-sm">
            <span className="flex items-center gap-1"><Heart className="h-4 w-4 text-red-500" /> Health</span>
            <span>{bot.health}%</span>
          </div>
          <Progress value={bot.health} aria-label={`${bot.health}% health`} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1 text-sm">
            <span className="flex items-center gap-1"><Beef className="h-4 w-4 text-yellow-600" /> Hunger</span>
            <span>{bot.hunger}%</span>
          </div>
          <Progress value={bot.hunger} aria-label={`${bot.hunger}% hunger`} className="h-2" />
        </div>

        <Separator />

        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-1"><Package className="h-4 w-4 text-primary"/> Inventory</h4>
          {bot.inventory.length > 0 ? (
            <ul className="text-sm text-muted-foreground space-y-1 max-h-20 overflow-y-auto pr-2">
              {bot.inventory.map((item) => (
                <li key={item.name} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>x{item.quantity}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground italic">Empty</p>
          )}
        </div>
         <p className="text-xs text-muted-foreground text-center mt-2">Click for AI summary</p>
      </CardContent>
    </Card>
  );
};

export default BotStatusCard;
