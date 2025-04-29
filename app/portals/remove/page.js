import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export default function RemovePortal() {
  // Sample data - in a real app, this would come from a database
  const portals = [
    { id: 1, name: "Student Portal", type: "Student", usersCount: 1250 },
    { id: 2, name: "Teacher Portal", type: "Teacher", usersCount: 85 },
    { id: 3, name: "Admin Portal", type: "Admin", usersCount: 12 },
    { id: 4, name: "Parent Portal", type: "Parent", usersCount: 750 },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Remove Portal</h1>
        <p className="text-muted-foreground">Remove an existing portal from the system</p>
      </div>

      <Alert variant="destructive" className="bg-red-50 border-red-200">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Warning: Removing a portal will permanently delete it and revoke access for all users. This action cannot be
          undone.
        </AlertDescription>
      </Alert>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Select Portal to Remove</CardTitle>
          <CardDescription>Choose the portal you want to remove from the system</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="portal">Portal</Label>
              <Select>
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

            <div className="border rounded-md p-4 bg-muted/50">
              <h3 className="font-medium mb-2">Portal Information</h3>
              <p className="text-sm text-muted-foreground mb-1">Select a portal above to see detailed information.</p>
              <p className="text-sm text-muted-foreground">You will need to confirm removal on the next step.</p>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Continue to Confirmation</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
