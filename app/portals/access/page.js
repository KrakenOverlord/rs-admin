"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PlusCircle, Trash2, CheckCircle2, Globe, User, Loader2 } from "lucide-react"

export default function PortalAccess() {
  // State for portal selection
  const [selectedPortal, setSelectedPortal] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // State for assigned access
  const [userEmail, setUserEmail] = useState("")
  const [userAccessLevel, setUserAccessLevel] = useState("read")
  const [userAccessError, setUserAccessError] = useState("")

  // State for domain access
  const [domain, setDomain] = useState("")
  const [domainAccessLevel, setDomainAccessLevel] = useState("read")
  const [domainAccessError, setDomainAccessError] = useState("")

  // Success messages
  const [successMessage, setSuccessMessage] = useState("")

  // Sample data - in a real app, this would come from a database
  const portals = [
    { id: 1, name: "Student Portal", type: "Student" },
    { id: 2, name: "Teacher Portal", type: "Teacher" },
    { id: 3, name: "Admin Portal", type: "Admin" },
    { id: 4, name: "Parent Portal", type: "Parent" },
  ]

  const assignedUsers = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", accessLevel: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Teacher", accessLevel: "Read, Write" },
    { id: 3, name: "Robert Johnson", email: "robert@example.com", role: "Teacher", accessLevel: "Read" },
  ]

  const domainAccess = [
    { id: 1, domain: "school.edu", accessLevel: "Read" },
    { id: 2, domain: "district.org", accessLevel: "Read, Write" },
  ]

  const handlePortalSelect = (portalId) => {
    setIsLoading(true)
    setSuccessMessage("")

    // Simulate API call with a delay
    setTimeout(() => {
      setSelectedPortal(portals.find((portal) => portal.id.toString() === portalId))
      setIsLoading(false)
    }, 500)
  }

  const handleAddUserAccess = (e) => {
    e.preventDefault()

    if (!userEmail) {
      setUserAccessError("Please enter a user email")
      return
    }

    if (!userEmail.includes("@")) {
      setUserAccessError("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    setUserAccessError("")
    setSuccessMessage("")

    // Simulate API call with a delay
    setTimeout(() => {
      setSuccessMessage(`Access granted to ${userEmail} for ${selectedPortal.name}`)
      setUserEmail("")
      setIsLoading(false)
    }, 1000)
  }

  const handleAddDomainAccess = (e) => {
    e.preventDefault()

    if (!domain) {
      setDomainAccessError("Please enter a domain")
      return
    }

    if (!domain.includes(".")) {
      setDomainAccessError("Please enter a valid domain")
      return
    }

    setIsLoading(true)
    setDomainAccessError("")
    setSuccessMessage("")

    // Simulate API call with a delay
    setTimeout(() => {
      setSuccessMessage(`Domain access granted to ${domain} for ${selectedPortal.name}`)
      setDomain("")
      setIsLoading(false)
    }, 1000)
  }

  const handleRemoveAccess = (type, id) => {
    setIsLoading(true)
    setSuccessMessage("")

    // Simulate API call with a delay
    setTimeout(() => {
      if (type === "user") {
        const user = assignedUsers.find((user) => user.id === id)
        setSuccessMessage(`Access removed for ${user.email}`)
      } else {
        const domainItem = domainAccess.find((item) => item.id === id)
        setSuccessMessage(`Domain access removed for ${domainItem.domain}`)
      }
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Manage Portal Access</h1>
        <p className="text-muted-foreground">Control who can access your portals</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Portal</CardTitle>
          <CardDescription>Choose a portal to manage its access</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="portal">Portal</Label>
              <Select onValueChange={handlePortalSelect} disabled={isLoading}>
                <SelectTrigger id="portal">
                  <SelectValue placeholder="Select a portal" />
                </SelectTrigger>
                <SelectContent>
                  {portals.map((portal) => (
                    <SelectItem key={portal.id} value={portal.id.toString()}>
                      {portal.name} ({portal.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

      {selectedPortal && (
        <Tabs defaultValue="assigned" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="assigned" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Assigned Access
            </TabsTrigger>
            <TabsTrigger value="domain" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Domain Access
            </TabsTrigger>
          </TabsList>

          {/* Assigned Access Tab */}
          <TabsContent value="assigned" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add User Access</CardTitle>
                <CardDescription>Grant access to individual users for {selectedPortal.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddUserAccess} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="userEmail">User Email</Label>
                      <Input
                        id="userEmail"
                        type="email"
                        placeholder="user@example.com"
                        value={userEmail}
                        onChange={(e) => {
                          setUserEmail(e.target.value)
                          setUserAccessError("")
                        }}
                        disabled={isLoading}
                      />
                      {userAccessError && <p className="text-sm text-red-500 mt-1">{userAccessError}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accessLevel">Access Level</Label>
                      <Select value={userAccessLevel} onValueChange={setUserAccessLevel} disabled={isLoading}>
                        <SelectTrigger id="accessLevel">
                          <SelectValue placeholder="Select access level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="read">Read</SelectItem>
                          <SelectItem value="write">Read & Write</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add User Access
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current User Access</CardTitle>
                <CardDescription>Users with access to {selectedPortal.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Access Level</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignedUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.accessLevel}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleRemoveAccess("user", user.id)}
                            disabled={isLoading}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Domain Access Tab */}
          <TabsContent value="domain" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add Domain Access</CardTitle>
                <CardDescription>Grant access to entire domains for {selectedPortal.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddDomainAccess} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="domain">Domain</Label>
                      <Input
                        id="domain"
                        placeholder="example.com"
                        value={domain}
                        onChange={(e) => {
                          setDomain(e.target.value)
                          setDomainAccessError("")
                        }}
                        disabled={isLoading}
                      />
                      {domainAccessError && <p className="text-sm text-red-500 mt-1">{domainAccessError}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="domainAccessLevel">Access Level</Label>
                      <Select value={domainAccessLevel} onValueChange={setDomainAccessLevel} disabled={isLoading}>
                        <SelectTrigger id="domainAccessLevel">
                          <SelectValue placeholder="Select access level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="read">Read</SelectItem>
                          <SelectItem value="write">Read & Write</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Domain Access
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Domain Access</CardTitle>
                <CardDescription>Domains with access to {selectedPortal.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Domain</TableHead>
                      <TableHead>Access Level</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {domainAccess.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.domain}</TableCell>
                        <TableCell>{item.accessLevel}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleRemoveAccess("domain", item.id)}
                            disabled={isLoading}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
