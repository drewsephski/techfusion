// Remove the 'use client' directive since this is a layout file
import React from 'react';
import { Metadata } from "next";
import "./globals.css";
import { Toaster as SonnerToaster } from "sonner";
import ErrorBoundary from "@/components/ui/error-boundary";
import { Inter, Rubik } from "next/font/google";
import Script from "next/script";
import { ProductProvider } from "@/contexts/product-context";
import { CartContextProvider } from '@/contexts/cart-context';
import { ClientOnly } from "@/components/client-only";
import { LoadingSpinner } from "@/components/loading-spinner";
import Footer from "@/components/footer";
import { ScrollBehavior } from "@/components/scroll-behavior";
import { Analytics } from '@vercel/analytics/react';
import SentryErrorBoundary from '@/lib/sentry/error-boundary';
import { PostHogProvider } from './provider'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-rubik",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Tech Fusion",
    template: "%s | Tech Fusion",
  },
  description: "A modern tech blog and portfolio website",
  keywords: ["tech", "blog", "portfolio", "web development"],
  authors: [{ name: "Tech Fusion" }],
  creator: "Tech Fusion",
  publisher: "Tech Fusion",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://techfusion.com",
    title: "TechFusion",
    description: "SaaS & Apparel E-Commerce for Tech Enthusiasts",
    siteName: "TechFusion",
    images: [
      {
        url: "https://techfusion.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "TechFusion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TechFusion",
    description: "SaaS & Apparel E-Commerce for Tech Enthusiasts",
    images: ["https://techfusion.com/twitter-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#00Aaff",
      },
    ],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SentryErrorBoundary>
      <html lang="en" className="scroll-smooth">
        <head>
          {/* Preconnect critical resources */}
          <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />

          {/* Critical CSS */}
          <style>{`
            :root {
              --color-primary: #00Aaff;
              --color-secondary: #00F5FF;
              --color-accent: #2D2D2D;
              --color-text: #F5F5F5;
              --color-text-secondary: #CCCCCC;
              --color-background: #1E1E1E;
            }
            
            .animate-fade-in {
              animation: fadeIn 0.5s ease-in-out;
            }
            
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            /* Optimize font loading */
            @font-face {
              font-family: 'Inter';
              src: local('Inter'), url(/fonts/inter.woff2) format('woff2');
              font-weight: 400;
              font-display: swap;
            }

            /* Critical path styles */
            html {
              scroll-behavior: smooth;
            }
            body {
              font-family: var(--font-inter);
              background-color: var(--color-background);
              color: var(--color-text);
            }
          `}</style>

          {/* Optimized critical resources */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />

          {/* Analytics */}
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
          />
          <Script id="google-analytics-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
                page_path: window.location.pathname,
                send_page_view: true
              });
            `}
          </Script>
        </head>

        <body className={`${inter.variable} ${rubik.variable} font-sans bg-[#1E1E1E] text-[#F5F5F5]`}>
          <PostHogProvider>
            <div className="min-h-screen flex flex-col">
              <CartContextProvider>
                <ProductProvider>
                  <ClientOnly>
                    <div className="flex-grow overflow-hidden">
                      <ScrollBehavior />
                      <SonnerToaster
                        theme="dark"
                        position="top-center"
                        className="max-w-md mx-auto"
                        toastOptions={{
                          duration: 3000,
                          className: "bg-[#2D2D2D] text-white border border-[#00Aaff]/20 shadow-lg",
                        }}
                      />
                      <ErrorBoundary>
                        <div className="relative">
                          <LoadingSpinner />
                          {children}
                        </div>
                      </ErrorBoundary>
                    </div>

                    <footer className="bg-[#2D2D2D] text-white py-8 mt-auto">
                      <Footer />
                    </footer>

                    <Analytics />
                  </ClientOnly>
                </ProductProvider>
              </CartContextProvider>
            </div>
          </PostHogProvider>
        </body>
      </html>
    </SentryErrorBoundary>
  );
}
