"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

const formSchema = z
  .object({
    portalId: z.string().min(1, {
      message: "Portal ID is required.",
    }),
    type: z.enum(["paid", "trial", "custom"], {
      required_error: "Please select an access type.",
    }),
    startDate: z.date({
      required_error: "Start date is required.",
    }),
    endDate: z
      .date({
        required_error: "End date is required.",
      })
      .refine((date) => date > new Date(), {
        message: "End date must be in the future.",
      }),
    numAccesses: z.coerce.number().int().positive({
      message: "Number of accesses must be a positive integer.",
    }),
    allowedDomains: z
      .string()
      .min(1, {
        message: "At least one domain is required.",
      })
      .refine(
        (value) => {
          const domains = value.split(",").map((domain) => domain.trim())
          return domains.every((domain) => /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(domain))
        },
        {
          message: "Please enter valid domain names separated by commas (e.g., example.com, subdomain.example.org).",
        },
      ),
    paymentId: z.string().min(1, {
      message: "Payment ID is required.",
    }),
    paymentType: z.enum(["invoice", "order", "none"], {
      required_error: "Please select a payment type.",
    }),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date.",
    path: ["endDate"],
  })

export function DomainAccessForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      portalId: "",
      numAccesses: 1,
      allowedDomains: "",
      paymentId: "",
      paymentType: "none",
    },
  })

  async function onSubmit(data) {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Form data:", data)

      toast.success("Portal access added successfully", {
        description: (
          <div className="mt-2">
            <p>Portal ID: {data.portalId}</p>
            <p>Type: {data.type}</p>
            <p>Start Date: {format(data.startDate, "PPP")}</p>
            <p>End Date: {format(data.endDate, "PPP")}</p>
            <p>Number of Accesses: {data.numAccesses}</p>
            <p>Allowed Domains: {data.allowedDomains}</p>
            <p>Payment Type: {data.paymentType}</p>
            <p>Payment ID: {data.paymentId}</p>
          </div>
        ),
      })

      form.reset()
    } catch (error) {
      toast.error("Error", {
        description: "Failed to add portal access. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-lg border p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Add Domain Access</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="portalId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portal ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter portal ID" {...field} />
                </FormControl>
                <FormDescription>Enter the unique identifier for the portal.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Access Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select access type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="trial">Trial</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Select the type of access to grant.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>When the access begins.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>When the access expires.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="numAccesses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Accesses</FormLabel>
                <FormControl>
                  <Input type="number" min="1" {...field} />
                </FormControl>
                <FormDescription>How many accesses to grant.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="allowedDomains"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Allowed Domains</FormLabel>
                <FormControl>
                  <Input placeholder="example.com, subdomain.example.org" {...field} />
                </FormControl>
                <FormDescription>Enter domain names separated by commas.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="invoice">Invoice</SelectItem>
                    <SelectItem value="order">Order</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Select the type of payment.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter payment ID" {...field} />
                </FormControl>
                <FormDescription>Enter the payment identifier.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Portal Access"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
