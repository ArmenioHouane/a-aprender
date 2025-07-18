import type { Metadata } from "next"
import { FileText, Download, AlertCircle, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Commission Information | Instructor Dashboard",
  description: "View platform commission details and related documents",
}

export default function CommissionInfoPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Commission Information</h2>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Platform Commission</AlertTitle>
        <AlertDescription>
          Our platform takes a 10% commission on all course sales. This helps us maintain and improve our services for
          both instructors and students.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Commission Overview</TabsTrigger>
          <TabsTrigger value="documents">Commission Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Commission Structure</CardTitle>
              <CardDescription>Understanding how our commission works</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Current Commission Rate</h3>
                  <p className="text-sm text-muted-foreground">Applied to all course sales</p>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  10%
                </Badge>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">How It Works</h3>
                <p className="text-sm text-muted-foreground">
                  For every course sale, 90% of the revenue goes to you, the instructor. The remaining 10% is our
                  platform fee, which covers:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Payment processing fees</li>
                  <li>Platform maintenance and improvements</li>
                  <li>Marketing and student acquisition efforts</li>
                  <li>Customer support for both instructors and students</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Example Calculation</h3>
                <p className="text-sm text-muted-foreground">
                  If your course sells for $100, you&apos;ll receive $90, and the platform retains $10 as commission.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Commission Documents</CardTitle>
              <CardDescription>Access your commission reports and agreements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Instructor Agreement</p>
                      <p className="text-xs text-muted-foreground">Last updated on Jan 1, 2025</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Commission Report (2024)</p>
                      <p className="text-xs text-muted-foreground">Generated on Jan 31, 2025</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Commission Report (2023)</p>
                      <p className="text-xs text-muted-foreground">Generated on Jan 31, 2024</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download All Documents
              </Button>
            </CardFooter>
          </Card>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important Notice</AlertTitle>
            <AlertDescription>
              Annual commission reports are generated at the end of each calendar year. Please review these documents
              for accurate record-keeping and tax purposes.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  )
}

