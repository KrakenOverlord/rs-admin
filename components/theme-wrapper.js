"use client"

import { ThemeProvider } from "@/components/ui/theme-provider"

export function ThemeWrapper({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="rs-admin-theme"
    >
      {children}
    </ThemeProvider>
  )
}