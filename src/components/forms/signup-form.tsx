import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type React from "react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from "@/lib/firebaseClient"
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from "firebase/auth"

interface ValidationRule {
  id: string;
  text: string;
  validate: (value: string) => boolean;
}

const passwordRules: ValidationRule[] = [
  { id: 'length', text: 'At least 6 characters', validate: (password) => password.length >= 6 },
  { id: 'uppercase', text: 'At least one uppercase letter', validate: (password) => /[A-Z]/.test(password) },
  { id: 'number', text: 'At least one number', validate: (password) => /\d/.test(password) },
  { id: 'symbol', text: 'At least one symbol', validate: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password) },
]

const emailRules: ValidationRule[] = [
    { id: 'emailFormat', text: 'Valid email format', validate: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) },
  ]
  

  const nameRules: ValidationRule[] = [
    { id: 'nameLength', text: 'At least 3 characters', validate: (name) => name.length >= 3 },
    { 
      id: 'validSpacing', 
      text: 'Invalid spacing: cannot start with space, no sequential spaces allowed', 
      validate: (name) => {
        // Check if the name starts with a space, contains sequential spaces, or ends with a space
        return !/^\s| {2,}|\s$/.test(name);
      } 
    },
  ];

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nameValidation, setNameValidation] = useState<Record<string, boolean>>({})
  const [emailValidation, setEmailValidation] = useState<Record<string, boolean>>({})
  const [passwordValidation, setPasswordValidation] = useState<Record<string, boolean>>({})
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const newNameValidation = nameRules.reduce((acc, rule) => {
      acc[rule.id] = rule.validate(name)
      return acc
    }, {} as Record<string, boolean>)
    setNameValidation(newNameValidation)
  }, [name])

  useEffect(() => {
    const newPasswordValidation = passwordRules.reduce((acc, rule) => {
      acc[rule.id] = rule.validate(password)
      return acc
    }, {} as Record<string, boolean>)
    setPasswordValidation(newPasswordValidation)
  }, [password])

  useEffect(() => {
    const newEmailValidation = emailRules.reduce((acc, rule) => {
      acc[rule.id] = rule.validate(email)
      return acc
    }, {} as Record<string, boolean>)
    setEmailValidation(newEmailValidation)
  }, [email])

  const isEmailValid = email && Object.values(emailValidation).every(Boolean)
  const isNameValid = name && Object.values(nameValidation).every(Boolean)
  const isPasswordValid = password && Object.values(passwordValidation).every(Boolean)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();  // Prevent form submission
    event.stopPropagation();
    setIsLoading(true)

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          username: email,
          email,
          password,
          privacySettings: "Everyone can see my profile",
          messagePermissions: "Everyone"
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: data.message || "Your account has been created successfully.",
          variant: "success",
        })
        router.push('/')
      } else {
        throw new Error(data.message || 'Signup failed')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }
  const handleSocialLogin = async (provider: string) => {
  
    try {
      let authProvider
      switch (provider) {
        case "google":
          authProvider = new GoogleAuthProvider()
          break
        case "facebook":
          authProvider = new FacebookAuthProvider()
          break
        case "apple":
          authProvider = new OAuthProvider("apple.com")
          break
        default:
          throw new Error("Invalid provider")
      }
  
      const result = await signInWithPopup(auth, authProvider)
      // Here you can handle the successful login, e.g., send the user info to your backend
      console.log("Social login successful", result.user)
      toast({
        title: "Success",
        description: `You have successfully logged in with ${provider}.`,
        variant: "success",
      })
      router.push("/")
    } catch (error) {
      console.error("Social login error", error)
      toast({
        title: "Error",
        description: `Failed to login with ${provider}. Please try again.`,
        variant: "destructive",
      })
    }
  } 


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={onSubmit}  className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Criar uma conta</h1>
                <p className="text-balance text-muted-foreground">Registe a sua conta A-Aprender</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input 
                id="name" 
                type="text" 
                placeholder="Exemplo Usuario" 
                onChange={(e) => setName(e.target.value)}
                className={isNameValid ? 'border-green-500  focus-visible:ring-green-400' : name ? 'border-red-500 dark:focus-visible:ring-red-500 focus-visible:ring-red-500' : ''}
                value={name}
                required />
                {name && !isNameValid && (
                <div className="space-y-1">
                  {nameRules.map(rule => (
                    <div key={rule.id} className={`flex items-center text-sm ${nameValidation[rule.id] ? 'text-green-500 ' : 'text-red-500'}`}>
                      {nameValidation[rule.id] ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <AlertCircle className="w-4 h-4 mr-2" />}
                      {rule.text}
                    </div>
                  ))}
                </div>
              )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                id="email" 
                type="email" 
                placeholder="m@examplo.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={isEmailValid ? 'border-green-500 focus-visible:ring-green-500' : email ? 'border-red-500 focus-visible:ring-red-500' : ''}
                required
              />
              {email && !isEmailValid && (
                <div className="space-y-1">
                  {emailRules.map(rule => (
                    <div key={rule.id} className={`flex items-center text-sm ${emailValidation[rule.id] ? 'text-green-500' : 'text-red-500'}`}>
                      {emailValidation[rule.id] ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <AlertCircle className="w-4 h-4 mr-2" />}
                      {rule.text}
                    </div>
                  ))}
                </div>
              )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input 
                id="password" 
                type="password" 
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={isPasswordValid ? 'border-green-500 focus-visible:ring-green-500 focus-visible:ring-offset-green-700' : password ? 'border-red-500 focus-visible:ring-red-500' : ''}
                required
              />
              {password && !isPasswordValid && (
                <div className="space-y-1">
                  {passwordRules.map(rule => (
                    <div key={rule.id} className={`flex items-center text-sm ${passwordValidation[rule.id] ? 'text-green-500' : 'text-red-500'}`}>
                      {passwordValidation[rule.id] ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <AlertCircle className="w-4 h-4 mr-2" />}
                      {rule.text}
                    </div>
                  ))}
                </div>
              )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirmar Senha</Label>
                <Input 
                id="confirm-password" 
                type="password" 
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing up...
          </>
        ) : (
          "Fazer Registo"
        )}
      </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-white dark:bg-[#0A0A0A] px-2 text-muted-foreground">Ou continuar com</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Button 
                 type="button"
                 onClick={() => handleSocialLogin("apple")}
                 disabled={isLoading}
                variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Cadastrar com a Apple</span>
                </Button>
                <Button 
                 type="button"
                 onClick={() => handleSocialLogin("google")}
                 disabled={isLoading}
                variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Cadastrar com a Google</span>
                </Button>
                <Button 
                 type="button"
                 onClick={() => handleSocialLogin("facebook")}
                 disabled={isLoading}
                variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Cadastrar com a Meta</span>
                </Button>
              </div>
              <div className="text-center text-sm">
                Já tem uma conta? {" "}
                <a href="/auth/login" className="underline underline-offset-4">
                 Entrar
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
          <Image 
  src="/login.jpg"
  alt="Image"
  width={600} 
  height={600}
  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" 
/>

          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        Ao clicar em continuar, você concorda com os nossos <a href="/terms">Termos de Serviço</a> e <a href="/privacy">Política de Privacidade</a>.
      </div>
    </div>
  )
}

