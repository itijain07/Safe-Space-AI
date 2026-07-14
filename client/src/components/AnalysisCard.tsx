import { Card } from '@/components/ui/card';
import { ReactNode } from 'react';

interface AnalysisCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function AnalysisCard({ title, icon, children, className = '' }: AnalysisCardProps) {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        {icon && <div className="text-xl">{icon}</div>}
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </Card>
  );
}
