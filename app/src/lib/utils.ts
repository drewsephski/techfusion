import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge multiple class names into a single string.
 * This function combines clsx and tailwind-merge for better class name handling.
 */
export function cn(...inputs: ClassValue[]): string {
  try {
    return twMerge(clsx(inputs));
  } catch (error) {
    console.error("Error in cn utility:", error);
    return "";
  }
}

/**
 * Create responsive class names for different breakpoints.
 */
export function responsiveClass(
  base: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string,
  xxl?: string
): string {
  return cn(
    base,
    sm && `sm:${sm}`,
    md && `md:${md}`,
    lg && `lg:${lg}`,
    xl && `xl:${xl}`,
    xxl && `2xl:${xxl}`
  );
}

/**
 * Create a responsive class name string with a base class and optional responsive variants.
 */
export function responsive(
  base: string,
  variants?: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    xxl?: string;
  }
): string {
  if (!variants) return base;
  
  return cn(base, Object.entries(variants).map(([key, value]) => 
    value ? `${key}:${value}` : ""
  ));
}

/**
 * Format currency value to a string with proper decimal places and symbol.
 */
export function formatCurrency(
  value: number,
  symbol: string = "$",
  decimals: number = 2
): string {
  try {
    return `${symbol}${value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}`;
  } catch (error) {
    console.error("Error formatting currency:", error);
    return `${symbol}${value}`;
  }
}

/**
 * Format date to a human-readable string.
 */
export function formatDate(date: Date | string | number, format: string = "MM/DD/YYYY"): string {
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      console.error("Invalid date:", date);
      return "";
    }

    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear();

    return format
      .replace("MM", month.toString().padStart(2, "0"))
      .replace("DD", day.toString().padStart(2, "0"))
      .replace("YYYY", year.toString());
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
}

/**
 * Create a conditional class name string
 */
export function conditionalClass(condition: boolean, className: string): string {
  return condition ? className : "";
}

/**
 * Safely format a number with commas
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/**
 * Safely truncate a string
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}

/**
 * Convert a string to title case
 */
export function toTitleCase(str: string): string {
  return str.replace(/\w+/g, (word) => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
}