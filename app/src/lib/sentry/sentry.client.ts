import { init } from "@sentry/nextjs";
import { BrowserTracing } from "@sentry/tracing";
import { Integration } from "@sentry/core";

// Initialize Sentry with tracing
init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || "development",
  integrations: [new BrowserTracing() as unknown as Integration],   
  tracesSampleRate: 1.0,
  debug: process.env.NODE_ENV === "development",
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
});
