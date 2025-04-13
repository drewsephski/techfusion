import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { cn } from "app/lib/utils"
import { Button } from "@/components/ui/button"

type PaginationLinkProps = {
  isActive?: boolean;
  size?: "icon" | "default";
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
} & React.ComponentProps<typeof Button>;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  onClick,
  disabled,
  children,
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      variant={isActive ? "outline" : "ghost"}
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-md",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

type PagePaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function PagePagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PagePaginationProps) {
  const showEllipsis = totalPages > 5;

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn(
        "mx-auto flex w-full justify-center",
        className
      )}
    >
      <ul className="flex flex-row items-center gap-1">
        <li>
          <PaginationLink
            aria-label="Previous page"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon className="mr-2 h-4 w-4" />
            Previous
          </PaginationLink>
        </li>

        {showEllipsis && currentPage > 3 && (
          <li>
            <PaginationLink isActive={false}>
              1
            </PaginationLink>
          </li>
        )}

        {showEllipsis && currentPage > 4 && (
          <li>
            <span className="flex items-center justify-center rounded-md px-3 py-1.5">
              <MoreHorizontalIcon className="h-4 w-4" />
            </span>
          </li>
        )}

        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const page = i + (currentPage - 2);
          if (page < 1 || page > totalPages) return null;
          return (
            <li key={page}>
              <PaginationLink
                isActive={currentPage === page}
                onClick={() => onPageChange(page)}
              >
                {page}
              </PaginationLink>
            </li>
          );
        })}

        {showEllipsis && currentPage < totalPages - 3 && (
          <li>
            <span className="flex items-center justify-center rounded-md px-3 py-1.5">
              <MoreHorizontalIcon className="h-4 w-4" />
            </span>
          </li>
        )}

        {showEllipsis && currentPage < totalPages - 2 && (
          <li>
            <PaginationLink isActive={false}>
              {totalPages}
            </PaginationLink>
          </li>
        )}

        <li>
          <PaginationLink
            aria-label="Next page"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRightIcon className="ml-2 h-4 w-4" />
          </PaginationLink>
        </li>
      </ul>
    </nav>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
