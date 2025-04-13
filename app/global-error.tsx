"use client";

import Error from "next/error";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset
}: {
  error: { message: string } | null;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="mb-4">{error?.message || "An unexpected error occurred"}</p>
          <button
            onClick={() => reset()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}