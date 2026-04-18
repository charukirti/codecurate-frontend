import type { ReactNode } from 'react';

interface TableHeadProps {
  children: ReactNode;
  className?: string;
}

export function TableHead({ children, className }: TableHeadProps) {
  return <th className={className}>{children}</th>;
}
