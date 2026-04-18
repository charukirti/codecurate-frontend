import type { ReactNode } from 'react';

interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

export function TableHeader({ className, children }: TableHeaderProps) {
  return <thead className={className}>{children}</thead>;
}
