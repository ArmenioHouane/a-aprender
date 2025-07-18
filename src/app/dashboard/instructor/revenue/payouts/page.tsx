import type { Metadata } from "next"
import { Calendar, CreditCard, BanknoteIcon as BankIcon, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const metadata: Metadata = {
  title: "Payouts | Instructor Dashboard",
  description: "Track and manage your earnings payouts",
}

// Sample payout data
const payouts = [
  {
    id: "PAY-12345",
    date: "2025-03-15",
    amount: "$8,245.50",
    status: "scheduled",
    method: "Bank Transfer",
  },
  {
    id: "PAY-12344",
    date: "2025-02-15",
    amount: "$6,120.75",
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: "PAY-12343",
    date: "2025-01-15",
    amount: "$5,890.25",
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: "PAY-12342",
    date: "2024-12-15",
    amount: "$7,450.00",
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: "PAY-12341",
    date: "2024-11-15",
    amount: "$4,980.30",
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: "PAY-12340",
    date: "2024-10-15",
    amount: "$5,320.45",
    status: "completed",
    method: "Bank Transfer",
  },
]

export default function PayoutsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Payouts</h2>
        <Button>
          <BankIcon className="mr-2 h-4 w-4" />
          Update Payment Method
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payout</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,245.50</div>
            <p className="text-xs text-muted-foreground">Scheduled for May 15, 2025</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid Out</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$29,761.75</div>
            <p className="text-xs text-muted-foreground">Lifetime earnings paid</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Method</CardTitle>
            <BankIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-md font-medium">Bank Transfer</div>
            <p className="text-xs text-muted-foreground">Account ending in ****4567</p>
          </CardContent>
        </Card>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important Notice</AlertTitle>
        <AlertDescription>
          Payouts are processed on the 15th of each month for the previous month&apos;s earnings. Minimum payout amount is
          $50.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Payout History</CardTitle>
          <CardDescription>Track all your past and upcoming payouts</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Payouts</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payout ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payouts.map((payout) => (
                      <TableRow key={payout.id}>
                        <TableCell className="font-medium">{payout.id}</TableCell>
                        <TableCell>{payout.date}</TableCell>
                        <TableCell>{payout.amount}</TableCell>
                        <TableCell>{payout.method}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {payout.status === "completed" ? (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                <span className="text-green-500">Completed</span>
                              </>
                            ) : (
                              <>
                                <Clock className="mr-2 h-4 w-4 text-amber-500" />
                                <span className="text-amber-500">Scheduled</span>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="completed" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payout ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payouts
                      .filter((p) => p.status === "completed")
                      .map((payout) => (
                        <TableRow key={payout.id}>
                          <TableCell className="font-medium">{payout.id}</TableCell>
                          <TableCell>{payout.date}</TableCell>
                          <TableCell>{payout.amount}</TableCell>
                          <TableCell>{payout.method}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                              <span className="text-green-500">Completed</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="scheduled" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payout ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payouts
                      .filter((p) => p.status === "scheduled")
                      .map((payout) => (
                        <TableRow key={payout.id}>
                          <TableCell className="font-medium">{payout.id}</TableCell>
                          <TableCell>{payout.date}</TableCell>
                          <TableCell>{payout.amount}</TableCell>
                          <TableCell>{payout.method}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-amber-500" />
                              <span className="text-amber-500">Scheduled</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Download Payout Reports
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

