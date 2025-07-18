"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  PanelRightIcon as AdminPanelSettings,
  School,
  ClapperboardIcon as ChalkboardTeacher,
  ArrowRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"
import { PERMISSIONS } from "@/utils/roles"
import SpinnerPage from "@/components/loader/spinner"

export default function RoleSelection() {

 

  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const { user, loading } = useAuth(PERMISSIONS.STUDENT.COURSES.VIEW)

  if (loading) {
    return <>
    <SpinnerPage />
  </>
  }

  if (!user) {
    return null 
  }







  const roles = [
    {
      id: "admin",
      title: "Administrador",
      description: "Gere utilizadores, cursos e definições do sistema",
      icon: AdminPanelSettings,
      color: "bg-blue-500",
      path: "/dashboard/admin/home",
    },
    {
      id: "student",
      title: "Estudante",
      description: "Acede aos seus cursos, tarefas e notas",
      icon: School,
      color: "bg-green-500",
      path: "/dashboard/student/home",
    },
    {
      id: "instructor",
      title: "Instrutor",
      description: "Gere os seus cursos, estudantes e tarefas",
      icon: ChalkboardTeacher,
      color: "bg-amber-500",
      path: "/dashboard/instructor",
    },
  ]

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId)
  }

  const handleContinue = () => {
    const selectedRoleData = roles.find((role) => role.id === selectedRole)
    if (selectedRoleData) {
      router.push(selectedRoleData.path)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Escolha o Seu Painel</h1>
          <p className="text-muted-foreground">Selecione o papel que melhor descreve a sua função</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <Card
              key={role.id}
              className={`cursor-pointer transition-all ${
                selectedRole === role.id ? "ring-2 ring-primary ring-offset-2" : "hover:shadow-md"
              }`}
              onClick={() => handleRoleSelect(role.id)}
            >
              <CardHeader>
                <div
                  className={`w-12 h-12 rounded-full ${role.color} flex items-center justify-center text-white mb-2`}
                >
                  <role.icon className="h-6 w-6" />
                </div>
                <CardTitle>{role.title}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full justify-between"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedRole(role.id)
                    router.push(role.path)
                  }}
                >
                  Selecionar <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button size="lg" onClick={handleContinue} disabled={!selectedRole} className="w-full md:w-auto">
            Continuar para o Painel de Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}

