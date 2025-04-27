import { Toaster } from "sonner"
import "./globals.css"

export const metadata = {
  title: "Admin Management",
  description: "Manage admin assignments to locations",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}