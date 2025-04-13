import * as React from "react"
import { cn } from "app/lib/utils"
import { CardProps } from "@/types/ui"
import { ErrorBoundary } from "@/components/ui/error-boundary"

const Card: React.FC<CardProps> = React.memo(({ 
  className, 
  children, 
  loading = false, 
  error = null, 
  ...props 
}) => {
  Card.displayName = 'Card';
  return (
    <ErrorBoundary>
      <div
        data-slot="card"
        className={cn(
          "bg-[#2D2D2D] text-white flex flex-col gap-6 rounded-xl border border-[#00Aaff]/10 py-6 shadow-sm hover:shadow-[#00Aaff]/20 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] active:scale-[0.99] active:shadow-none",
          loading && "opacity-75 cursor-not-allowed",
          error && "border-red-500",
          className
        )}
        {...props}
      >
        {loading && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#00Aaff] border-t-transparent"></div>
          </div>
        )}
        {error && (
          <div className="text-red-500 text-center p-4">
            {error}
          </div>
        )}
        {!loading && !error && children}
      </div>
    </ErrorBoundary>
  )
})

const CardHeader: React.FC<CardProps> = React.memo(({ 
  className, 
  children, 
  loading = false, 
  error = null, 
  ...props 
}) => {
  CardHeader.displayName = 'CardHeader';
  return (
    <ErrorBoundary>
      <div
        data-slot="card-header"
        className={cn(
          "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
          loading && "opacity-75 cursor-not-allowed",
          error && "border-red-500",
          className
        )}
        {...props}
      >
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#00Aaff] border-t-transparent"></div>
        )}
        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}
        {!loading && !error && children}
      </div>
    </ErrorBoundary>
  )
})

const CardTitle: React.FC<CardProps> = React.memo(({ 
  className, 
  children, 
  loading = false, 
  error = null, 
  ...props 
}) => {
  CardTitle.displayName = 'CardTitle';
  return (
    <ErrorBoundary>
      <div
        data-slot="card-title"
        className={cn(
          "leading-none font-semibold",
          loading && "opacity-75 cursor-not-allowed",
          error && "border-red-500",
          className
        )}
        {...props}
      >
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#00Aaff] border-t-transparent"></div>
        )}
        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}
        {!loading && !error && children}
      </div>
    </ErrorBoundary>
  )
})

const CardDescription: React.FC<CardProps> = React.memo(({ 
  className, 
  children, 
  loading = false, 
  error = null, 
  ...props 
}) => {
  CardDescription.displayName = 'CardDescription';
  return (
    <ErrorBoundary>
      <div
        data-slot="card-description"
        className={cn(
          "text-[#00Aaff]/70 text-sm transition-colors duration-200 hover:text-[#00Aaff]",
          loading && "opacity-75 cursor-not-allowed",
          error && "border-red-500",
          className
        )}
        {...props}
      >
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#00Aaff] border-t-transparent"></div>
        )}
        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}
        {!loading && !error && children}
      </div>
    </ErrorBoundary>
  )
})

const CardAction: React.FC<CardProps> = React.memo(({ 
  className, 
  children, 
  loading = false, 
  error = null, 
  ...props 
}) => {
  CardAction.displayName = 'CardAction';
  return (
    <ErrorBoundary>
      <div
        data-slot="card-action"
        className={cn(
          "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
          loading && "opacity-75 cursor-not-allowed",
          error && "border-red-500",
          className
        )}
        {...props}
      >
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#00Aaff] border-t-transparent"></div>
        )}
        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}
        {!loading && !error && children}
      </div>
    </ErrorBoundary>
  )
})

const CardContent: React.FC<CardProps> = React.memo(({ 
  className, 
  children, 
  loading = false, 
  error = null, 
  ...props 
}) => {
  CardContent.displayName = 'CardContent';
  return (
    <ErrorBoundary>
      <div
        data-slot="card-content"
        className={cn(
          "px-6 transition-all duration-300 ease-out",
          loading && "opacity-75 cursor-not-allowed",
          error && "border-red-500",
          className
        )}
        {...props}
      >
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#00Aaff] border-t-transparent"></div>
        )}
        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}
        {!loading && !error && children}
      </div>
    </ErrorBoundary>
  )
})

const CardFooter: React.FC<CardProps> = React.memo(({ 
  className, 
  children, 
  loading = false, 
  error = null, 
  ...props 
}) => {
  CardFooter.displayName = 'CardFooter';
  return (
    <ErrorBoundary>
      <div
        data-slot="card-footer"
        className={cn(
          "flex items-center px-6 [.border-t]:pt-6",
          loading && "opacity-75 cursor-not-allowed",
          error && "border-red-500",
          className
        )}
        {...props}
      >
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#00Aaff] border-t-transparent"></div>
        )}
        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}
        {!loading && !error && children}
      </div>
    </ErrorBoundary>
  )
})

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}

/**
 * A reusable Card component that provides a consistent layout and styling.
 * @param {CardProps} props - The props for the Card component
 * @param {string} [props.className] - Additional className to apply
 * @param {React.ReactNode} props.children - Content to render inside the card
 * @param {boolean} [props.loading] - Whether the component is in loading state
 * @param {string} [props.error] - Error message to display
 * @returns {React.ReactElement} A Card component
 */
