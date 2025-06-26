import { NextResponse } from "next/server"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const portalId = searchParams.get("portalId")

    if (!portalId) {
      return NextResponse.json({ error: "Portal ID is required" }, { status: 400 })
    }

    // Simulating API response
    // In a real application, you would fetch this data from a database
    const adminsMap = {
      1: [
        { id: "a1", email: "admin1@example.com" },
        { id: "a2", email: "admin2@example.com" },
      ],
      2: [{ id: "a3", email: "sales.admin@example.com" }],
      3: [
        { id: "a4", email: "support1@example.com" },
        { id: "a5", email: "support2@example.com" },
        { id: "a6", email: "support3@example.com" },
      ],
      4: [],
    }

    const admins = adminsMap[portalId] || []

    return NextResponse.json(admins)
  } catch (error) {
    console.error("Error fetching admins:", error)
    return NextResponse.json({ error: "Failed to fetch admins" }, { status: 500 })
  }
}
