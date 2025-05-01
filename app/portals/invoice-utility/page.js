"use client"

import { useState, useEffect } from "react"

export default function InvoiceUtilityPortal() {
  const [formData, setFormData] = useState({
    accessType: "assigned",
    numberOfUsers: 1,
    allowedDomains: "",
  })

  const [showInvoice, setShowInvoice] = useState(false)
  const [domainList, setDomainList] = useState([])

  useEffect(() => {
    // Parse domains whenever allowedDomains changes
    const domains = formData.allowedDomains
      .split(",")
      .map((domain) => domain.trim())
      .filter((domain) => domain.length > 0)

    setDomainList(domains)
  }, [formData.allowedDomains])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Calculate mock pricing
  const basePrice = formData.accessType === "assigned" ? 10 : 15
  const userPrice = basePrice * formData.numberOfUsers
  const domainCount = domainList.length
  const domainFee = formData.accessType === "domain" ? domainCount * 5 : 0
  const totalPrice = userPrice + domainFee

  return (
    <main className="flex-1 p-6">
      <h1 className="text-2xl font-bold">Invoice Utility</h1>
      <p className="mt-2 text-muted-foreground">Generate an invoice item description that can be copy/pasted into the invoice.</p>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div>
          <form className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="accessType" className="text-sm font-medium">
                Access Type
              </label>
              <select
                id="accessType"
                name="accessType"
                value={formData.accessType}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="assigned">Assigned Access</option>
                <option value="domain">Domain Access</option>
              </select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="numberOfUsers" className="text-sm font-medium">
                Number of Users
              </label>
              <input
                id="numberOfUsers"
                name="numberOfUsers"
                type="number"
                min="1"
                value={formData.numberOfUsers}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="allowedDomains" className="text-sm font-medium">
                Allowed Domains
              </label>
              <textarea
                id="allowedDomains"
                name="allowedDomains"
                value={formData.allowedDomains}
                onChange={handleChange}
                placeholder="example.com, school.edu"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <p className="text-xs text-muted-foreground">Enter domain names separated by commas.</p>
            </div>

            {/* Dynamic text section based on form fields */}
            <h3 className="mt-12 font-medium mb-2">Copy the text below and paste it into the invoice:</h3>
            <div className="mt-2 p-4 bg-muted rounded-md">
              <span className="space-y-2 text-sm">Supports up to {formData.numberOfUsers} teachers.
                {formData.accessType === "assigned" ? " Includes Management Portal" : " Includes automated access provisioning"}

                {domainList.length > 0 && (
                  <span>{domainList.length > 1 ? ` for domains: ${domainList.join(", ")}.` : ` for domain: ${domainList[0]}.`}</span>
                )}

                <span> Professional development resources available.</span>

                {Number.parseInt(formData.numberOfUsers) > 50 && (
                  <span> Plan includes priority support.</span>
                )}
              </span>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
