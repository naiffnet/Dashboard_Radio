"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ 
  children, 
  ...props 
}: ThemeProviderProps) {
  // Use suppressHydrationWarning to prevent hydration warnings
  return (
    <NextThemesProvider {...props} enableSystem={true} suppressHydrationWarning>
      <div suppressHydrationWarning>{children}</div>
    </NextThemesProvider>
  )
}

