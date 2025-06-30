"use client"

import { useState, useEffect } from "react"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in by looking for uid in localStorage
    const uid = localStorage.getItem('uid')
    setIsLoggedIn(!!uid)
  }, [])

  return (
    <main className="flex-1 p-6">
      <h1 className="text-2xl font-bold">Welcome to Razor Sparrow Admin</h1>
      {isLoggedIn && (
        <p className="mt-2 text-muted-foreground">Use the menu above to navigate through the admin panel.</p>
      )}

      {!isLoggedIn && (
        <p className="mt-2 text-muted-foreground">Log-in to administer portals and teachers</p>
      )}
    </main>
  )
}
