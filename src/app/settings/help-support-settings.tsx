import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function HelpSupportSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Help & Support</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline" className="w-full">
          FAQs & Help Center
        </Button>
        <Button variant="outline" className="w-full">
          Contact Support
        </Button>
        <Button variant="outline" className="w-full">
          Report a Problem
        </Button>
      </CardContent>
    </Card>
  )
}

