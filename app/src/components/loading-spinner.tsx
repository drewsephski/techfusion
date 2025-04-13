"use client";

import * as React from "react";

export function LoadingSpinner({
  className,
  size = "1em",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { size?: string }) {
  const sizeClass = size === "1em" ? "w-4 h-4" : size === "2em" ? "w-8 h-8" : "w-6 h-6";

  return (
    <div
      className={`relative inline-flex ${sizeClass} ${className} animate-fade-in`}
      role="status"
      style={{ width: size, height: size }}
      {...props}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3 h-3 bg-[#00Aaff] rounded-full animate-ping"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 bg-[#00Aaff]/50 rounded-full animate-pulse"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-[#00Aaff]/30 rounded-full"></div>
      </div>
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
}