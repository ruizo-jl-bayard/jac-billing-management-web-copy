import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function InvoicesPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>Manage your billing invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Invoice management functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
