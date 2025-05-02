import type { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Bot as BotIcon } from 'lucide-react'; // Renamed Bot icon import

interface BotSummaryDialogProps {
  botName: string | null;
  summary: string | null;
  isLoading: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const BotSummaryDialog: FC<BotSummaryDialogProps> = ({
  botName,
  summary,
  isLoading,
  isOpen,
  onOpenChange,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BotIcon className="h-5 w-5 text-primary" />
            AI Summary for {botName ?? 'Bot'}
          </DialogTitle>
          <DialogDescription>
            A concise overview of this bot's recent activities and contributions.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isLoading ? (
            <p className="text-center text-muted-foreground">Generating summary...</p>
          ) : summary ? (
            <p className="text-sm text-foreground whitespace-pre-wrap">{summary}</p>
          ) : (
            <p className="text-center text-muted-foreground">No summary available.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BotSummaryDialog;
