"use client";

import * as Sentry from "@sentry/nextjs";
import Error from "next/error";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset
}: {
  error: { message: string } | null
  reset: () => void
}) {
  useEffect(() => {
    if (error) {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <html>
      <body>
        <Error statusCode={500} title={error?.message} />
        <button onClick={() => reset()} className="mt-4">Try again</button>
      </body>
    </html>
  );
}