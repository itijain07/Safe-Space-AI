import { Card } from '@/components/ui/card';
import { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export function StatCard({
  icon,
  label,
  value,
  description,
  trend = 'neutral',
  className = '',
}: StatCardProps) {
  const trendColor = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-muted-foreground',
  }[trend];

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
          {description && (
            <p className={`text-xs mt-2 ${trendColor}`}>{description}</p>
          )}
        </div>
        <div className="text-2xl opacity-60">{icon}</div>
      </div>
    </Card>
  );
}
