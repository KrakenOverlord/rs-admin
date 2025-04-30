import { DomainAccessForm } from "@/components/domain-access-form"

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Portal Access</h1>
      <div className="max-w-2xl mx-auto">
        <DomainAccessForm />
      </div>
    </div>
  )
}
