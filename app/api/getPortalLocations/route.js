export async function GET() {
  // This is a mock implementation
  // In a real application, you would fetch this data from a database or external API

  // Simulate a slight delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Sample data
  const data = [
    {
      locationId: 1,
      locationName: "Main Campus",
      adminEmails: ["john.doe@school.edu", "jane.smith@school.edu"],
    },
    {
      locationId: 2,
      locationName: "North Building",
      adminEmails: ["robert.johnson@school.edu"],
    },
    {
      locationId: 3,
      locationName: "South Building",
      adminEmails: [],
    },
    {
      locationId: 4,
      locationName: "West Wing",
      adminEmails: ["maria.garcia@school.edu", "david.wilson@school.edu"],
    },
    {
      locationId: 5,
      locationName: "East Wing",
      adminEmails: ["sarah.brown@school.edu"],
    },
  ]

  return Response.json(data)
}
