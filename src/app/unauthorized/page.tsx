import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function Forbidden() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-[#000] px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-950 rounded-lg shadow-md">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="p-3 rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter">Access Denied</h1>
          <p className="text-gray-500">You don&apos;t have permission to access this page.</p>
        </div>

        <div className="space-y-4">
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard">Return to Dashboard</Link>
          </Button>

          <div className="text-center">
            <Link href="/" className="text-sm text-primary hover:underline">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

