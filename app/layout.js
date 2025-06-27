import { Inter } from "next/font/google"
import "./globals.css"
import { MainMenu } from "@/components/main-menu"
import { ThemeWrapper } from "@/components/theme-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Razor Sparrow Admin",
  description: "Admin panel for Razor Sparrow",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className} suppressHydrationWarning>
        <ThemeWrapper>
          <div className="min-h-screen flex flex-col">
            <MainMenu />
            {children}
          </div>
        </ThemeWrapper>
      </body>
    </html>
  )
}