import type { Metadata } from "next"
import { Download, Search, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Transactions | Instructor Dashboard",
  description: "View and manage your course sales transactions",
}

// Sample transaction data
const transactions = [
  {
    id: "TRX-12345",
    date: "2025-03-10",
    student: "John Doe",
    course: "Advanced JavaScript",
    amount: "$89.99",
    status: "completed",
    type: "purchase",
  },
  {
    id: "TRX-12346",
    date: "2025-03-09",
    student: "Jane Smith",
    course: "React Fundamentals",
    amount: "$69.99",
    status: "completed",
    type: "purchase",
  },
  {
    id: "TRX-12347",
    date: "2025-03-08",
    student: "Mike Johnson",
    course: "Data Structures",
    amount: "-$79.99",
    status: "completed",
    type: "refund",
  },
  {
    id: "TRX-12348",
    date: "2025-03-07",
    student: "Sarah Williams",
    course: "UI/UX Design Principles",
    amount: "$59.99",
    status: "completed",
    type: "purchase",
  },
  {
    id: "TRX-12349",
    date: "2025-03-06",
    student: "Alex Brown",
    course: "Python for Data Science",
    amount: "$74.99",
    status: "completed",
    type: "purchase",
  },
  {
    id: "TRX-12350",
    date: "2025-03-05",
    student: "Emily Davis",
    course: "Machine Learning Basics",
    amount: "$99.99",
    status: "completed",
    type: "purchase",
  },
  {
    id: "TRX-12351",
    date: "2025-03-04",
    student: "David Wilson",
    course: "Web Development Bootcamp",
    amount: "$149.99",
    status: "completed",
    type: "purchase",
  },
  {
    id: "TRX-12352",
    date: "2025-03-03",
    student: "Lisa Taylor",
    course: "Digital Marketing",
    amount: "-$89.99",
    status: "completed",
    type: "refund",
  },
  {
    id: "TRX-12353",
    date: "2025-03-02",
    student: "Robert Martin",
    course: "Clean Code Principles",
    amount: "$79.99",
    status: "completed",
    type: "purchase",
  },
  {
    id: "TRX-12354",
    date: "2025-03-01",
    student: "Jennifer Lee",
    course: "Graphic Design Masterclass",
    amount: "$129.99",
    status: "completed",
    type: "purchase",
  },
]

export default function TransactionsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>View and filter all your course sales and refunds</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0 mb-4">
            <div className="flex items-center space-x-2 w-full md:w-1/3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search transactions..." className="flex-1" />
            </div>

            <div className="flex items-center space-x-2 w-full md:w-2/3">
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Transaction Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="purchase">Purchases Only</SelectItem>
                  <SelectItem value="refund">Refunds Only</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="30days">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.student}</TableCell>
                    <TableCell>{transaction.course}</TableCell>
                    <TableCell
                      className={`text-right ${transaction.type === "refund" ? "text-red-500" : "text-green-500"}`}
                    >
                      {transaction.amount}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                        {transaction.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-end space-x-2 py-4">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

