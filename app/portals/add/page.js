import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddPortal() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Add Portal</h1>
        <p className="text-muted-foreground">Create a new portal in the system</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Portal Information</CardTitle>
          <CardDescription>Enter the details for the new portal</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Portal Name</Label>
              <Input id="name" placeholder="Enter portal name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter portal description" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Portal Type</Label>
              <Select>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select portal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student Portal</SelectItem>
                  <SelectItem value="teacher">Teacher Portal</SelectItem>
                  <SelectItem value="admin">Admin Portal</SelectItem>
                  <SelectItem value="parent">Parent Portal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">Portal URL</Label>
              <Input id="url" placeholder="https://example.com/portal" />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button>Create Portal</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
