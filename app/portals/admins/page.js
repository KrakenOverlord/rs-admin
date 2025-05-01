"use client"

import { useState, useEffect } from "react"
import { PlusCircle, Trash2, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function AdminsPortal() {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedLocationId, setSelectedLocationId] = useState(null)
  const [newEmail, setNewEmail] = useState("")

  // Fetch locations from the API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/getPortalLocations")

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()

        // Transform the API data to match our component's expected structure
        // Assuming the API returns data in a different format
        const transformedData = data.map((item) => ({
          id: item.locationId,
          name: item.locationName,
          admins: item.adminEmails || [],
        }))

        setLocations(transformedData)

        // Set the first location as selected if we have locations
        if (transformedData.length > 0) {
          setSelectedLocationId(transformedData[0].id)
        }
      } catch (error) {
        console.error("Failed to fetch locations:", error)
        toast.error("Failed to load locations. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchLocations()
  }, [])

  const selectedLocation = locations.find((loc) => loc.id === selectedLocationId)

  const handleAddAdmin = async () => {
    if (!newEmail.trim()) {
      toast.error("Please enter an email address")
      return
    }

    if (!newEmail.includes("@") || !newEmail.includes(".")) {
      toast.error("Please enter a valid email address")
      return
    }

    if (selectedLocation?.admins.includes(newEmail)) {
      toast.error("This admin is already assigned to this location")
      return
    }

    try {
      // You would typically make an API call here to update the server
      // For now, we'll just update the local state
      const updatedLocations = locations.map((loc) => {
        if (loc.id === selectedLocationId) {
          return {
            ...loc,
            admins: [...loc.admins, newEmail],
          }
        }
        return loc
      })

      setLocations(updatedLocations)
      setNewEmail("")
      toast.success("Admin added to location")

      // Example of how you might call an API to update the server
      // await fetch('/api/updatePortalAdmin', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     locationId: selectedLocationId,
      //     email: newEmail,
      //     action: 'add'
      //   }),
      // })
    } catch (error) {
      console.error("Failed to add admin:", error)
      toast.error("Failed to add admin. Please try again.")
    }
  }

  const handleRemoveAdmin = async (email) => {
    try {
      // You would typically make an API call here to update the server
      // For now, we'll just update the local state
      const updatedLocations = locations.map((loc) => {
        if (loc.id === selectedLocationId) {
          return {
            ...loc,
            admins: loc.admins.filter((t) => t !== email),
          }
        }
        return loc
      })

      setLocations(updatedLocations)
      toast.success("Admin removed from location")

      // Example of how you might call an API to update the server
      // await fetch('/api/updatePortalAdmin', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     locationId: selectedLocationId,
      //     email: email,
      //     action: 'remove'
      //   }),
      // })
    } catch (error) {
      console.error("Failed to remove admin:", error)
      toast.error("Failed to remove admin. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6 flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-lg">Loading locations...</p>
        </div>
      </div>
    )
  }

  if (locations.length === 0) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Location Admin Management</h1>
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold mb-2">No Locations Found</h2>
              <p className="text-muted-foreground">There are no locations available to manage.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Admin Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Locations</CardTitle>
            <CardDescription>Select a location to manage admins</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-2">
                {locations.map((location) => (
                  <Button
                    key={location.id}
                    variant={selectedLocationId === location.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedLocationId(location.id)}
                  >
                    <div className="flex justify-between w-full items-center">
                      <span>{location.name}</span>
                      <Badge variant="secondary">{location.admins.length}</Badge>
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {selectedLocation ? (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{selectedLocation.name}</CardTitle>
              <CardDescription>Manage admin emails for this location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add admin email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddAdmin()
                      }
                    }}
                  />
                  <Button onClick={handleAddAdmin}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Admins ({selectedLocation.admins.length})</h3>

                  {selectedLocation.admins.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No admins assigned to this location yet.</p>
                  ) : (
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-2">
                        {selectedLocation.admins.map((email, index) => (
                          <div key={index} className="flex items-center justify-between p-2 rounded-md border">
                            <span className="text-sm">{email}</span>
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveAdmin(email)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="md:col-span-2">
            <CardContent className="p-6">
              <div className="text-center py-8">
                <h2 className="text-xl font-semibold mb-2">No Location Selected</h2>
                <p className="text-muted-foreground">Please select a location from the list.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
