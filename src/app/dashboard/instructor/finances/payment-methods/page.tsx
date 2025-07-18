import type { Metadata } from "next"
import { CreditCard, Plus, Trash2, Edit, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Payment Methods | Instructor Dashboard",
  description: "Manage your payment methods for receiving payouts",
}

// Sample payment methods
const paymentMethods = [
  {
    id: "pm-1",
    type: "credit_card",
    name: "Visa ending in 4242",
    details: "Expires 09/2026",
    isDefault: true,
  },
  {
    id: "pm-2",
    type: "paypal",
    name: "PayPal",
    details: "instructor@example.com",
    isDefault: false,
  },
  {
    id: "pm-3",
    type: "emola",
    name: "eMola",
    details: "+258 84 123 4567",
    isDefault: false,
  },
]

export default function PaymentMethodsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Payment Methods</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Payment Method</DialogTitle>
              <DialogDescription>Add a new payment method for receiving payouts.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="payment-type">Payment Type</Label>
                <Select>
                  <SelectTrigger id="payment-type">
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="emola">eMola</SelectItem>
                    <SelectItem value="mpesa">M-Pesa</SelectItem>
                    <SelectItem value="mkesh">mKesh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="account-number">Account Number / Email</Label>
                <Input id="account-number" placeholder="Enter account details" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Payment Method</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Payment Methods</AlertTitle>
        <AlertDescription>
          Add and manage your preferred payment methods for receiving course earnings payouts.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4">
        <h3 className="text-lg font-medium">Your Payment Methods</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {paymentMethods.map((method) => (
            <Card key={method.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {method.type === "credit_card" ? (
                    <div className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      {method.name}
                    </div>
                  ) : method.type === "paypal" ? (
                    <div className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 11l5-5 5 5M7 17l5-5 5 5" />
                      </svg>
                      {method.name}
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M7 15h0M2 9h20" />
                      </svg>
                      {method.name}
                    </div>
                  )}
                </CardTitle>
                {method.isDefault && <Badge variant="outline">Default</Badge>}
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{method.details}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

