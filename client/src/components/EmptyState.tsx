import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {icon && <div className="text-6xl mb-4 opacity-50">{icon}</div>}
      <h3 className="text-2xl font-bold mb-2 text-center">{title}</h3>
      <p className="text-muted-foreground text-center mb-6 max-w-md">{description}</p>
      {actionLabel && (
        actionHref ? (
          <Link href={actionHref}>
            <a className="inline-block">
              <Button>{actionLabel}</Button>
            </a>
          </Link>
        ) : (
          <Button onClick={onAction}>{actionLabel}</Button>
        )
      )}
    </div>
  );
}
