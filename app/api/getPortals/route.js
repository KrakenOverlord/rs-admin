import { NextResponse } from "next/server"

// This would typically fetch from a database or external API
export async function GET() {
  try {
    // Simulating API response
    const portals = [
      { id: "1", name: "Marketing Portal" },
      { id: "2", name: "Sales Portal" },
      { id: "3", name: "Support Portal" },
      { id: "4", name: "Engineering Portal" },
    ]

    return NextResponse.json(portals)
  } catch (error) {
    console.error("Error fetching portals:", error)
    return NextResponse.json({ error: "Failed to fetch portals" }, { status: 500 })
  }
}
