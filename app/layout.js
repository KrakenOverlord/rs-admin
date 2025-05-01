import { Inter } from "next/font/google"
import "./globals.css"
import { MainMenu } from "@/components/main-menu"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Razor Sparrow Admin",
  description: "Admin panel for Razor Sparrow",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <MainMenu />
          {children}
        </div>
      </body>
    </html>
  )
}