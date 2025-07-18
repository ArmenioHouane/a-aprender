import type { Metadata } from "next"
import { CreditCard, Receipt, Clock, CheckCircle, Download, Calendar, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Earnings | Instructor Dashboard",
  description: "Manage your earnings and view your payout history",
}

// Sample earnings data
const earningsHistory = [
  {
    id: "EARN-12345",
    date: "2025-03-01",
    description: "Course Sales - Introduction to React",
    amount: "$500.00",
    commission: "$50.00",
    status: "paid",
  },
  {
    id: "EARN-12344",
    date: "2025-02-01",
    description: "Course Sales - Advanced JavaScript",
    amount: "$750.00",
    commission: "$75.00",
    status: "paid",
  },
  {
    id: "EARN-12343",
    date: "2025-01-01",
    description: "Course Sales - Python for Beginners",
    amount: "$600.00",
    commission: "$60.00",
    status: "paid",
  },
  // Add more sample data as needed
]

export default function EarningsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Earnings</h2>
        <Button>
          <CreditCard className="mr-2 h-4 w-4" />
          Request Payout
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <Badge variant="default">This Month</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,850.00</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Commission</CardTitle>
            <Badge variant="outline">10%</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$185.00</div>
            <p className="text-xs text-muted-foreground">Deducted from total earnings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payout</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,665.00</div>
            <p className="text-xs text-muted-foreground">Scheduled for April 1, 2025</p>
          </CardContent>
        </Card>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Commission Information</AlertTitle>
        <AlertDescription>
          Our platform takes a 10% commission on all course sales. This helps us maintain and improve our services.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Earnings History</CardTitle>
          <CardDescription>View your past earnings and commissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Earnings</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {earningsHistory.map((earning) => (
                  <TableRow key={earning.id}>
                    <TableCell className="font-medium">{earning.id}</TableCell>
                    <TableCell>{earning.date}</TableCell>
                    <TableCell>{earning.description}</TableCell>
                    <TableCell>{earning.amount}</TableCell>
                    <TableCell>{earning.commission}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {earning.status === "paid" ? (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                            <span className="text-green-500">Paid</span>
                          </>
                        ) : (
                          <>
                            <Clock className="mr-2 h-4 w-4 text-amber-500" />
                            <span className="text-amber-500">Pending</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <Receipt className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download CSV
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

