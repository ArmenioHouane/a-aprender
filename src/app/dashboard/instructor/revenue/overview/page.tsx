import type { Metadata } from "next"
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  LineChart,
  BarChart,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Revenue Overview | Instructor Dashboard",
  description: "Track your course sales and revenue performance",
}

export default function RevenueOverviewPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Revenue Overview</h2>
        <div className="flex items-center space-x-2">
          <Tabs defaultValue="30days">
            <TabsList>
              <TabsTrigger value="7days">7 days</TabsTrigger>
              <TabsTrigger value="30days">30 days</TabsTrigger>
              <TabsTrigger value="3months">3 months</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,543.65</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+18.2% from last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Course Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+24.5% from last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Sale Price</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$36.68</div>
            <div className="flex items-center pt-1 text-xs text-red-500">
              <ArrowDownRight className="mr-1 h-3 w-3" />
              <span>-2.3% from last period</span>
            </div>
          </CardContent>
        </Card>
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
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Monthly revenue breakdown over the selected period</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center">
              <LineChart className="h-8 w-8 text-muted" />
              <span className="ml-2 text-muted">Revenue trend chart</span>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Selling Courses</CardTitle>
            <CardDescription>Your best performing courses by revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Advanced JavaScript", value: "$4,250.00" },
                { name: "React Fundamentals", value: "$3,120.00" },
                { name: "Data Structures", value: "$2,845.00" },
                { name: "UI/UX Design Principles", value: "$1,980.00" },
                { name: "Python for Data Science", value: "$1,650.00" },
              ].map((item, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
            <CardDescription>Revenue breakdown by course category</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center">
              <BarChart className="h-8 w-8 text-muted" />
              <span className="ml-2 text-muted">Category revenue chart</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest course purchases and refunds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "John Doe", course: "Advanced JavaScript", amount: "$89.99", type: "purchase" },
                { name: "Jane Smith", course: "React Fundamentals", amount: "$69.99", type: "purchase" },
                { name: "Mike Johnson", course: "Data Structures", amount: "-$79.99", type: "refund" },
                { name: "Sarah Williams", course: "UI/UX Design", amount: "$59.99", type: "purchase" },
                { name: "Alex Brown", course: "Python for Data Science", amount: "$74.99", type: "purchase" },
              ].map((item, i) => (
                <div key={i} className="flex items-center">
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${item.type === "refund" ? "bg-red-500" : "bg-green-500"}`}
                  ></div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium leading-none">{item.name}</p>
                      <p
                        className={`text-sm font-medium ${item.type === "refund" ? "text-red-500" : "text-green-500"}`}
                      >
                        {item.amount}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{item.course}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Transactions
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

