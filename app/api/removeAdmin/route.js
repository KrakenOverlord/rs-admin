import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const body = await request.json()
    const { portalId, email } = body

    if (!portalId || !email) {
      return NextResponse.json({ error: "Portal ID and email are required" }, { status: 400 })
    }

    // In a real application, you would remove the admin from your database
    // This is just a mock response

    return NextResponse.json({
      success: true,
      message: `Admin ${email} removed from portal ${portalId}`,
    })
  } catch (error) {
    console.error("Error removing admin:", error)
    return NextResponse.json({ error: "Failed to remove admin" }, { status: 500 })
  }
}
