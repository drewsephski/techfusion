import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          neonBlue: "#00F5FF",
          neonMagenta: "#FF00E6",
          neonGreen: "#00FFA3",
          neonPurple: "#8000FF",
          blue: {
            50: "#E3F2FD",
            100: "#BBDEFB",
            200: "#90CAF9",
            300: "#64B5F6",
            400: "#42A5F5",
            500: "#2196F3",
            600: "#1E88E5",
            700: "#1976D2",
            800: "#1565C0",
            900: "#0D47A1",
            950: "#002171"
          },
          darkBlue: {
            50: "#0D47A1",
            100: "#0D47A1",
            200: "#0C3E7E",
            300: "#0A3460",
            400: "#082A42",
            500: "#061F24",
            600: "#041416",
            700: "#030A0C",
            800: "#010508",
            900: "#000204",
            950: "#000000"
          },
          white: "#FFFFFF",
          black: "#000000",
          gray: {
            50: "#F9FAFB",
            100: "#F3F4F6",
            200: "#E5E7EB",
            300: "#D1D5DB",
            400: "#9CA3AF",
            500: "#6B7280",
            600: "#4B5563",
            700: "#374151",
            800: "#1F2937",
            900: "#111827",
            950: "#030712"
          },
          darkGray: "#111827",
          lightGray: "#1F2937",
          muted: "#2D2D2D",
          light: "#F5F5F5"
        },
        bg: {
          primary: "#0D47A1",
          secondary: "#0C3E7E",
          tertiary: "#0A3460",
          surface: "#082A42",
          overlay: "rgba(13, 71, 161, 0.8)",
          neonOverlay: "rgba(0, 245, 255, 0.1)",
          dark: "#061F24",
          deep: "#041416",
          muted: "#030A0C",
          light: "#010508",
          white: "#FFFFFF",
          black: "#000000",
          gray: "#1F2937",
          darkGray: "#111827",
          lightGray: "#374151"
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#E5E7EB",
          tertiary: "#9CA3AF",
          muted: "#6B7280",
          neon: "#00F5FF"
        },
        shadow: {
          neon: "0 0 20px rgba(0, 245, 255, 0.3)",
          glow: "0 0 30px rgba(0, 245, 255, 0.4)",
          dark: "0 0 20px rgba(0, 0, 0, 0.3)"
        },
        border: {
          primary: "#1E88E5",
          secondary: "#1976D2",
          neon: "#00F5FF",
          muted: "#374151"
        },
        interactive: {
          hover: "rgba(0, 0, 25, 0.4)",
          active: "rgba(0, 245, 255, 0.2)",
          focus: "rgba(0, 245, 255, 0.3)"
        },
      },
      animation: {
        'neon-glow': 'neon-glow 1.5s ease-in-out infinite',
        'neon-pulse': 'neon-pulse 1s ease-in-out infinite',
        'neon-flicker': 'neon-flicker 1.5s linear infinite',
        'neon-shimmer': 'neon-shimmer 2s linear infinite',
        'neon-ripple': 'neon-ripple 1.5s ease-out infinite'
      },
      keyframes: {
        'neon-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 245, 255, 0.3), 0 0 40px rgba(0, 245, 255, 0.1)',
            transform: 'scale(1.005)'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(0, 245, 255, 0.6), 0 0 60px rgba(0, 245, 255, 0.3)',
            transform: 'scale(1.01)'
          }
        },
        'neon-pulse': {
          '0%, 100%': { 
            transform: 'scale(1)',
            filter: 'brightness(100%)'
          },
          '50%': { 
            transform: 'scale(1.02)',
            filter: 'brightness(110%)'
          }
        },
        'neon-flicker': {
          '0%': { 
            opacity: '1',
            filter: 'brightness(100%)'
          },
          '19%': { opacity: '1' },
          '20%': { 
            opacity: '0.5',
            filter: 'brightness(80%)'
          },
          '21%': { opacity: '1' },
          '23%': { opacity: '1' },
          '24%': { 
            opacity: '0.5',
            filter: 'brightness(70%)'
          },
          '25%': { opacity: '1' },
          '54%': { opacity: '1' },
          '55%': { 
            opacity: '0.5',
            filter: 'brightness(60%)'
          },
          '56%': { opacity: '1' },
          '100%': { 
            opacity: '1',
            filter: 'brightness(100%)'
          }
        },
        'neon-shimmer': {
          '0%': { 
            transform: 'translateX(-100%)',
            opacity: '0.8'
          },
          '100%': { 
            transform: 'translateX(100%)',
            opacity: '0.8'
          }
        },
        'neon-ripple': {
          '0%': { 
            transform: 'scale(0)',
            opacity: '0.8'
          },
          '50%': { 
            transform: 'scale(1.2)',
            opacity: '0.3'
          },
          '100%': { 
            transform: 'scale(1.5)',
            opacity: '0.1'
          }
        }
      },
    },
  },
  plugins: [],
};
export default config;