import * as React from 'react'
import { cn } from '@/lib/utils'
import { Input } from './input'

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
          <span className="absolute left-3 text-sm text-muted-foreground pointer-events-none z-10">
            {prefix}
          </span>
        )}
        <Input
          className={cn(
            prefix && 'pl-7',
            suffix && 'pr-8',
            className
          )}
          ref={ref}
          {...props}
        />
        {suffix && (
          <span className="absolute right-3 text-sm text-muted-foreground pointer-events-none z-10">
            {suffix}
          </span>
        )}
      </div>
    )
  }
)
InputGroup.displayName = 'InputGroup'

export { InputGroup }
