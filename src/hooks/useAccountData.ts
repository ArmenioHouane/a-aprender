"use client"

import { useState, useEffect } from "react"
import { useSession } from "./useSession"

interface UserData {
  _id: string
  name?: string
  email: string
  username?: string
  country?: string
  phoneNumber?: string
  privacySettings: string
  messagePermissions: string
  avatar?: string
  role: "user" | "admin" | "guest"
  status: "Active" | "Inactive"
  subscription: "Free" | "Paid" | "Creator"
  accessLevel: "Basic" | "Limited" | "Full"
}

interface UseAccountDataReturn {
  userData: UserData | null
  loading: boolean
  error: string | null
  updateUser: (data: Partial<UserData>) => Promise<boolean>
}

export function useAccountData(): UseAccountDataReturn {
  // Pass 'account.view' as the required permission
  const { user } = useSession()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch user data
  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    async function fetchUserData() {
      try {
        setLoading(true)
        const response = await fetch("/api/account")

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }

        const data = await response.json()
        setUserData(data.user)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch user data")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [user])

  // Update user data
  const updateUser = async (data: Partial<UserData>): Promise<boolean> => {
    if (!user) return false

    try {
      setLoading(true)
      const response = await fetch("/api/account", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const result = await response.json()
      setUserData(result.user)
      setError(null)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update user data")
      return false
    } finally {
      setLoading(false)
    }
  }

  return { userData, loading, error, updateUser }
}

