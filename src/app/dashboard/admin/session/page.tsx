"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/hooks/useSession"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, RefreshCw, LogOut } from "lucide-react"

export default function SessionManagementPage() {
  const router = useRouter()
  const { user, loading, refreshSession } = useSession()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isClearing, setIsClearing] = useState(false)

  // Refresh session
  const handleRefreshSession = async () => {
    try {
      setIsRefreshing(true)
      await refreshSession()
    } catch (error) {
      console.error("Error refreshing session:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  // Clear session
  const handleClearSession = async () => {
    try {
      setIsClearing(true)
      const response = await fetch("/api/auth/session/manage", {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to clear session")
      }

      // Redirect to login page
      router.push("/auth/login")
    } catch (error) {
      console.error("Error clearing session:", error)
    } finally {
      setIsClearing(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container max-w-2xl py-10">
        <Card>
          <CardHeader>
            <CardTitle>Session Management</CardTitle>
            <CardDescription>No active session found</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push("/auth/login")}>Go to Login</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-2xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Session Management</CardTitle>
          <CardDescription>Manage your current session</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-1">
            <h3 className="text-sm font-medium text-muted-foreground">Current Session</h3>
            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm whitespace-pre-wrap break-all">{JSON.stringify(user, null, 2)}</pre>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between gap-2">
          <Button variant="outline" onClick={handleRefreshSession} disabled={isRefreshing || isClearing}>
            {isRefreshing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Session
              </>
            )}
          </Button>

          <Button variant="destructive" onClick={handleClearSession} disabled={isRefreshing || isClearing}>
            {isClearing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Clearing...
              </>
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Clear Session
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

