import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputGroupProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prefix?: string
  suffix?: string
}

const InputGroup = React.forwardRef<HTMLInputElement, InputGroupProps>(
  ({ className, prefix, suffix, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-sm text-muted-foreground pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          className={cn(
            'flex h-10 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
            prefix && 'pl-7',
            suffix && 'pr-8',
            className
          )}
          ref={ref}
          {...props}
        />
        {suffix && (
          <span className="absolute right-3 text-sm text-muted-foreground pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    )
  }
)
InputGroup.displayName = 'InputGroup'

export { InputGroup }
