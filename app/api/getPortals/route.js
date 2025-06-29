import { NextResponse } from "next/server"

export async function GET(request) {
  try {
    // Get the authorization header from the request
    const authHeader = request.headers.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: "Authorization header required" }, { status: 401 })
    }

    // Extract the ID token from the authorization header
    const idToken = authHeader.replace('Bearer ', '')

    // Make request to Firebase Cloud Function
    console.log("*************************************************************  ")

    const response = await fetch(
      "https://us-central1-gradetransferersandbox.cloudfunctions.net/getPortals",
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error("Firebase API error:", response.status, errorData)
      return NextResponse.json(
        { error: "Failed to fetch portals from Firebase" },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Return the data from Firebase
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching portals:", error)
    return NextResponse.json(
      { error: "Failed to fetch portals" },
      { status: 500 }
    )
  }
}
