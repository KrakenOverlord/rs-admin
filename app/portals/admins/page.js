"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function AdminPortalPage() {
  const [portals, setPortals] = useState([])
  const [selectedPortal, setSelectedPortal] = useState(null)
  const [admins, setAdmins] = useState([])
  const [newAdminEmail, setNewAdminEmail] = useState("")
  const [isLoadingPortals, setIsLoadingPortals] = useState(false)
  const [isLoadingAdmins, setIsLoadingAdmins] = useState(false)
  const [isAddingAdmin, setIsAddingAdmin] = useState(false)
  const [isRemovingAdmin, setIsRemovingAdmin] = useState(null)

  // Fetch portals on component mount
  useEffect(() => {
    fetchPortals()
  }, [])

  // Fetch admins when a portal is selected
  useEffect(() => {
    if (selectedPortal) {
      fetchAdmins(selectedPortal.id)
    } else {
      setAdmins([])
    }
  }, [selectedPortal])

  const fetchPortals = async () => {
    setIsLoadingPortals(true)
    try {
      const response = await fetch("/api/getPortals")
      if (!response.ok) {
        throw new Error("Failed to fetch portals")
      }
      const data = await response.json()
      setPortals(data)
    } catch (error) {
      console.error("Error fetching portals:", error)
      toast.error("Failed to load portals. Please try again.")
    } finally {
      setIsLoadingPortals(false)
    }
  }

  const fetchAdmins = async (portalId) => {
    setIsLoadingAdmins(true)
    try {
      const response = await fetch(`/api/getAdmins?portalId=${portalId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch admins")
      }
      const data = await response.json()
      setAdmins(data)
    } catch (error) {
      console.error("Error fetching admins:", error)
      toast.error("Failed to load admins. Please try again.")
    } finally {
      setIsLoadingAdmins(false)
    }
  }

  const handlePortalSelect = (portal) => {
    setSelectedPortal(portal)
  }

  const handleAddAdmin = async (e) => {
    e.preventDefault()

    if (!selectedPortal) {
      toast.error("Please select a portal first.")
      return
    }

    if (!newAdminEmail || !isValidEmail(newAdminEmail)) {
      toast.error("Please enter a valid email address.")
      return
    }

    setIsAddingAdmin(true)
    try {
      const response = await fetch("/api/addAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          portalId: selectedPortal.id,
          email: newAdminEmail,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add admin")
      }

      // Refresh the admin list
      await fetchAdmins(selectedPortal.id)
      setNewAdminEmail("")
      toast.success(`Admin ${newAdminEmail} added successfully.`)
    } catch (error) {
      console.error("Error adding admin:", error)
      toast.error("Failed to add admin. Please try again.")
    } finally {
      setIsAddingAdmin(false)
    }
  }

  const handleRemoveAdmin = async (admin) => {
    if (!selectedPortal) return

    setIsRemovingAdmin(admin.id)
    try {
      const response = await fetch("/api/removeAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          portalId: selectedPortal.id,
          email: admin.email,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to remove admin")
      }

      // Refresh the admin list
      await fetchAdmins(selectedPortal.id)
      toast.success(`Admin ${admin.email} removed successfully.`)
    } catch (error) {
      console.error("Error removing admin:", error)
      toast.error("Failed to remove admin. Please try again.")
    } finally {
      setIsRemovingAdmin(null)
    }
  }

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Portal Admin Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Portals List */}
        <Card>
          <CardHeader>
            <CardTitle>Portals</CardTitle>
            <CardDescription>Select a portal to manage its admins</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingPortals ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : portals.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No portals available</p>
            ) : (
              <div className="space-y-2">
                {portals.map((portal) => (
                  <Button
                    key={portal.id}
                    variant={selectedPortal?.id === portal.id ? "default" : "outline"}
                    className="w-full justify-start text-left"
                    onClick={() => handlePortalSelect(portal)}
                  >
                    {portal.name}
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Admins Management */}
        <Card>
          <CardHeader>
            <CardTitle>Admins</CardTitle>
            <CardDescription>
              {selectedPortal ? `Manage admins for ${selectedPortal.name}` : "Select a portal to view admins"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!selectedPortal ? (
              <p className="text-muted-foreground text-center py-4">Please select a portal first</p>
            ) : (
              <>
                {/* Add Admin Form */}
                <form onSubmit={handleAddAdmin} className="mb-6">
                  <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                    <div className="flex-1">
                      <Label htmlFor="email" className="sr-only">
                        Email
                      </Label>
                      <Input
                        id="email"
                        placeholder="Enter admin email"
                        value={newAdminEmail}
                        onChange={(e) => setNewAdminEmail(e.target.value)}
                        disabled={isAddingAdmin}
                      />
                    </div>
                    <Button type="submit" disabled={isAddingAdmin}>
                      {isAddingAdmin ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        "Add Admin"
                      )}
                    </Button>
                  </div>
                </form>

                {/* Admins List */}
                {isLoadingAdmins ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : admins.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No admins found for this portal</p>
                ) : (
                  <div className="space-y-2">
                    {admins.map((admin) => (
                      <div key={admin.id} className="flex items-center justify-between p-3 border rounded-md">
                        <span className="truncate">{admin.email}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveAdmin(admin)}
                          disabled={isRemovingAdmin === admin.id}
                        >
                          {isRemovingAdmin === admin.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4 text-destructive" />
                          )}
                          <span className="sr-only">Remove admin</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
