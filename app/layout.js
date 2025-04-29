import { Toaster } from "sonner"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ui/theme-provider"
import MainNav from "@/components/ui/main-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Admin Portal",
  description: "Admin portal for managing users, admins, teachers, and portals",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex min-h-screen flex-col">
            <MainNav />
            <main className="flex-1 container mx-auto p-4 md:p-6">{children}</main>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
