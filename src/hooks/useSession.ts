"use client"

import { useEffect, useState, useCallback } from "react"
import type { Role } from "@/utils/roles"

interface User {
  id: string
  name: string
  email: string
  role: Role
  avatar?: string
}

interface UseSessionReturn {
  user: User | null
  loading: boolean
  refreshSession: () => Promise<void>
}

export function useSession(): UseSessionReturn {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchSession = async () => {
    try {
      const res = await fetch("/api/auth/session")
      const data = await res.json()

      if (data.authenticated) {
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error("Error fetching session:", error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  // Initial session fetch
  useEffect(() => {
    fetchSession()
  }, []) // Removed fetchSession from dependencies

  // Refresh session function
  const refreshSession = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/auth/session/manage")

      if (!res.ok) {
        throw new Error("Failed to refresh session")
      }

      // Fetch updated session data
      await fetchSession()
    } catch (error) {
      console.error("Error refreshing session:", error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, []) // Removed fetchSession from dependencies

  return { user, loading, refreshSession }
}

