import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export function PaymentSubscriptionSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment & Subscription</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Current Plan</Label>
          <p className="text-sm text-muted-foreground">Pro Plan - $19.99/month</p>
          <div className="flex space-x-2">
            <Button variant="outline">Upgrade</Button>
            <Button variant="outline">Cancel Subscription</Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Payment Methods</Label>
          <Button variant="outline">Manage Payment Methods</Button>
        </div>
        <div className="space-y-2">
          <Label>Invoice History</Label>
          <Button variant="outline">Download Invoices</Button>
        </div>
      </CardContent>
    </Card>
  )
}

