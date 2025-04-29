"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Search, PlusCircle, Trash2, CheckCircle2 } from "lucide-react"

export default function ManageTeacherAccess() {
  const [email, setEmail] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState("")
  const [teacherFound, setTeacherFound] = useState(false)
  const [teacherData, setTeacherData] = useState(null)
  const [selectedAccessType, setSelectedAccessType] = useState("subscription")
  const [isAddingAccess, setIsAddingAccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  // Mock teacher data - in a real app, this would come from an API call
  const mockTeacher = {
    id: 1,
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    department: "Science",
    access: [{ type: "Trial", addedOn: "2023-10-15", expiresOn: "2023-11-15" }],
  }

  const handleSearch = (e) => {
    e.preventDefault()

    if (!email) {
      setSearchError("Please enter a teacher email address")
      return
    }

    setIsSearching(true)
    setSearchError("")
    setSuccessMessage("")

    // Simulate API call with a delay
    setTimeout(() => {
      // In a real app, you would fetch the teacher data from an API
      if (email.toLowerCase() === mockTeacher.email.toLowerCase()) {
        setTeacherFound(true)
        setTeacherData(mockTeacher)
      } else {
        setTeacherFound(false)
        setSearchError("No teacher found with this email address")
      }
      setIsSearching(false)
    }, 1000)
  }

  const handleAddAccess = () => {
    setIsAddingAccess(true)
    setSuccessMessage("")

    // Simulate API call with a delay
    setTimeout(() => {
      // In a real app, you would send a request to add access
      const updatedTeacher = { ...teacherData }

      // Check if access already exists
      const accessExists = updatedTeacher.access.some(
        (access) => access.type.toLowerCase() === selectedAccessType.toLowerCase(),
      )

      if (!accessExists) {
        const today = new Date()
        const expiryDate = new Date()
        expiryDate.setMonth(today.getMonth() + 12) // 1 year for subscription

        if (selectedAccessType === "trial") {
          expiryDate.setMonth(today.getMonth() + 1) // 1 month for trial
        }

        updatedTeacher.access.push({
          type: selectedAccessType.charAt(0).toUpperCase() + selectedAccessType.slice(1),
          addedOn: today.toISOString().split("T")[0],
          expiresOn: expiryDate.toISOString().split("T")[0],
        })

        setTeacherData(updatedTeacher)
        setSuccessMessage(
          `${selectedAccessType.charAt(0).toUpperCase() + selectedAccessType.slice(1)} access added successfully`,
        )
      } else {
        setSearchError(`Teacher already has ${selectedAccessType} access`)
      }

      setIsAddingAccess(false)
    }, 1000)
  }

  const handleRemoveAccess = (accessType) => {
    // Simulate API call with a delay
    setTimeout(() => {
      // In a real app, you would send a request to remove access
      const updatedTeacher = { ...teacherData }
      updatedTeacher.access = updatedTeacher.access.filter(
        (access) => access.type.toLowerCase() !== accessType.toLowerCase(),
      )

      setTeacherData(updatedTeacher)
      setSuccessMessage(`${accessType} access removed successfully`)
    }, 500)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Manage Teacher Access</h1>
        <p className="text-muted-foreground">Add or remove access types for teachers</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Find Teacher</CardTitle>
          <CardDescription>Enter the email address of the teacher to manage their access</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex space-x-2">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="teacher@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSearching}
                />
                {searchError && <p className="text-sm text-red-500 mt-1">{searchError}</p>}
              </div>
              <Button type="submit" disabled={isSearching}>
                {isSearching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Find Teacher
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {teacherFound && teacherData && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>{teacherData.name}</CardTitle>
              <CardDescription>
                {teacherData.email} • {teacherData.department}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Current Access</h3>
                  {teacherData.access.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No access types assigned</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {teacherData.access.map((access, index) => (
                        <div key={index} className="flex items-center space-x-2 border rounded-lg p-2">
                          <div>
                            <Badge variant="outline">{access.type}</Badge>
                            <div className="text-xs text-muted-foreground mt-1">
                              Added: {access.addedOn} • Expires: {access.expiresOn}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleRemoveAccess(access.type)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium mb-2">Add Access Type</h3>
                  <div className="space-y-4">
                    <RadioGroup
                      defaultValue="subscription"
                      value={selectedAccessType}
                      onValueChange={setSelectedAccessType}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div>
                        <RadioGroupItem value="subscription" id="subscription" className="peer sr-only" />
                        <Label
                          htmlFor="subscription"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <span className="mb-1">Subscription</span>
                          <span className="text-xs text-muted-foreground">Paid monthly/yearly</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="trial" id="trial" className="peer sr-only" />
                        <Label
                          htmlFor="trial"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <span className="mb-1">Trial</span>
                          <span className="text-xs text-muted-foreground">30-day access</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="grandfathered" id="grandfathered" className="peer sr-only" />
                        <Label
                          htmlFor="grandfathered"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <span className="mb-1">Grandfathered</span>
                          <span className="text-xs text-muted-foreground">Legacy pricing</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="custom" id="custom" className="peer sr-only" />
                        <Label
                          htmlFor="custom"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <span className="mb-1">Custom</span>
                          <span className="text-xs text-muted-foreground">Special arrangement</span>
                        </Label>
                      </div>
                    </RadioGroup>

                    <Button onClick={handleAddAccess} disabled={isAddingAccess} className="w-full">
                      {isAddingAccess ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add Access
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {successMessage && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">{successMessage}</AlertDescription>
            </Alert>
          )}
        </>
      )}
    </div>
  )
}
