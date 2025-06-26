import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const body = await request.json()
    const { portalId, email } = body

    if (!portalId || !email) {
      return NextResponse.json({ error: "Portal ID and email are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // In a real application, you would add the admin to your database
    // This is just a mock response

    return NextResponse.json({
      success: true,
      message: `Admin ${email} added to portal ${portalId}`,
    })
  } catch (error) {
    console.error("Error adding admin:", error)
    return NextResponse.json({ error: "Failed to add admin" }, { status: 500 })
  }
}
