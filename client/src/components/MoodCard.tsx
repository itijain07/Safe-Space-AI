import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { aiService } from '@/services/ai';
import { capitalizeFirst } from '@/lib/formatting';

interface MoodCardProps {
  mood: string;
  score: number;
  className?: string;
}

export function MoodCard({ mood, score, className = '' }: MoodCardProps) {
  const emoji = aiService.getMoodEmoji(mood);
  const color = aiService.getMoodColor(mood);

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center gap-4">
        <div className="text-5xl">{emoji}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{capitalizeFirst(mood)}</h3>
          <div className="space-y-2">
            <Progress value={score} className="h-2" />
            <p className="text-sm text-muted-foreground">{score}% confidence</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
