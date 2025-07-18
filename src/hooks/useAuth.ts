"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/hooks/useSession"
import { hasPermission, type Role } from "@/utils/roles"

export const useAuth = (requiredPermission: string) => {
  const { user, loading } = useSession()
  const router = useRouter()
  const [permissionChecked, setPermissionChecked] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && !loading) {
      // Verifica se o usuário está autenticado
      if (!user) {
        router.push("/auth/login")
        return
      }

      // Verifica as permissões do usuário
      try {
        const userRole = user.role as Role
        if (!hasPermission(userRole, requiredPermission)) {
          router.push("/unauthorized")
          return
        }

        // Se o usuário estiver autenticado e tiver permissão, libera a renderização
        setPermissionChecked(true)
      } catch (error) {
        console.error("Error checking permissions:", error)
        router.push("/unauthorized")
      }

      // Marca a autenticação como verificada
      setAuthChecked(true)
    }
  }, [user, loading, requiredPermission, router])

  // Aguarda a verificação de autenticação e permissões antes de servir a página
  if (loading || !authChecked || !permissionChecked) {
    return { user: null, loading: true } // Pode renderizar algum loading ou nada
  }

  return { user, loading }
}
