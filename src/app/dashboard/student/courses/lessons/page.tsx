import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
    return (
      <div className="flex-1 flex flex-col gap-4 p-4 w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Dashboard Lessons</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Welcome to your dashboard</p>
          </CardContent>
        </Card>
      </div>
    )
  }
  
