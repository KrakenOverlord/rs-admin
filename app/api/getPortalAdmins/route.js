import { NextResponse } from "next/server"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const portalId = searchParams.get("portalId")

    if (!portalId) {
      return NextResponse.json({ error: "Portal ID is required" }, { status: 400 })
    }

    // Get the authorization header from the request
    const authHeader = request.headers.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: "Authorization header required" }, { status: 401 })
    }

    // Extract the ID token from the authorization header
    const idToken = authHeader.replace('Bearer ', '')

    // Make request to Firebase Cloud Function to get portal admins
    const response = await fetch(
      "https://us-central1-gradetransferersandbox.cloudfunctions.net/getPortalAdmins",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          portalId: portalId
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error("Firebase API error:", response.status, errorData)
      return NextResponse.json(
        { error: "Failed to fetch portal admins from Firebase" },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log(data)

    // Return the data from Firebase
    return NextResponse.json(data.admins)
  } catch (error) {
    console.error("Error fetching portal admins:", error)
    return NextResponse.json(
      { error: "Failed to fetch portal admins" },
      { status: 500 }
    )
  }
}
