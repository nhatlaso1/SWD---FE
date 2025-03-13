import type React from 'react';
interface DashboardHeaderProps {
  heading: string;
  subheading?: string;
  children?: React.ReactNode;
}

export function DashboardHeader({
  heading,
  subheading,
  children
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
        {subheading && <p className="text-muted-foreground">{subheading}</p>}
      </div>
      {children}
    </div>
  );
}
