import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { type ReactNode } from 'react';

interface StrategyCardProps {
  title: string;
  description: string;
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  children?: ReactNode;
}

export function StrategyCard({
  title,
  description,
  enabled,
  onEnabledChange,
  children,
}: StrategyCardProps) {
  return (
    <Card className="border-2 transition-all duration-200 hover:border-primary/50">
      <CardHeader>
        <div className="flex items-start gap-3">
          <Checkbox
            id={`strategy-${title}`}
            checked={enabled}
            onCheckedChange={onEnabledChange}
            className="mt-1"
          />
          <div className="flex-1">
            <Label
              htmlFor={`strategy-${title}`}
              className="text-base font-semibold cursor-pointer"
            >
              {title}
            </Label>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>

      {enabled && children && (
        <CardContent className="pt-0">
          <div className="space-y-4 pl-7">{children}</div>
        </CardContent>
      )}
    </Card>
  );
}
