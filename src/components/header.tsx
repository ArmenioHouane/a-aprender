'use client'

import { useState,useRef,  useEffect } from 'react'
import Link from 'next/link'
import { Moon, CircleCheck, Sun, Laptop, Home, LogIn, User, Settings, LogOut, Component,  BookOpen, Bell, Mail } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Cart } from './cart'
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [apiTheme, setApiTheme] = useState<string | null>(null);
  const { user } = useAuth()
  const router = useRouter()


 useEffect(() => {


    if (user) {  
    }
  }, [user]);

  
  useEffect(() => {
    const fetchTheme = async () => {
      const response = await fetch('/api/theme?theme=' + resolvedTheme); 
      const data = await response.json();
      setApiTheme(data.theme);
    };

    fetchTheme();
  }, [resolvedTheme]); 

  const [mounted, setMounted] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseOver = () => {
    setIsOpen(true);
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      closeTimeoutRef.current = null;
    }, 3000);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  

  const handleLogout = async () => {
    const response = await fetch("/api/logout", { method: "POST" })
    if (response.ok) {
      router.push("/auth/login") // Redirect to login page after logout
    }
  }


  

  return (
    <>
    <header className="bg-[#FFFFFF] dark:bg-[#0A0A0A] border-b-2  dark:shadow shadow-sm dark:border-[#27272a] dark:border-b-2 fixed  top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold">A-Aprender</h1>
        <div className="flex items-center space-x-4">
<Cart />
        
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsOpen(!isOpen)} 
              onMouseOver={() => setIsOpen(true)}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar || "#"} alt={`${user?.name}'s avatar`} />
                <AvatarFallback>{user?.name ? user.name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 "
            align="end"
            forceMount
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            <DropdownMenuLabel className="font-normal ">
            <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name || "Guest"}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email || "Not logged in"}</p>
              </div>
              
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild className='cursor-pointer hover:bg-[#e2e1e1]  dark:hover:bg-[#262626]'>
                <Link href="/" className="flex items-center">
                  <Home className="mr-2 h-4 w-4" />
                  <span>Home</span>
                </Link>
              </DropdownMenuItem>
            
              <DropdownMenuItem asChild className='cursor-pointer hover:bg-[#e2e1e1] dark:hover:bg-[#262626]'>
                <Link href="/dashboard" className="flex items-center">
                  <Component className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
             
              <DropdownMenuItem asChild  className='cursor-pointer hover:bg-[#e2e1e1] dark:hover:bg-[#262626]'>
                <Link href="/courses" className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>Cursos</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild  className='cursor-pointer hover:bg-[#e2e1e1] dark:hover:bg-[#262626]'>
                <Link href="/announcements" className="flex items-center">
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Anúcios</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild  className='cursor-pointer hover:bg-[#e2e1e1] dark:hover:bg-[#262626]'>
                <Link href="/contact" className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Contacto</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild  className='cursor-pointer hover:bg-[#e2e1e1] dark:hover:bg-[#262626]'>
                <Link href="/auth/login" className="flex items-center">
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Login</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild  className='cursor-pointer hover:bg-[#e2e1e1] dark:hover:bg-[#262626]'>
                <Link href="/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild  className='cursor-pointer hover:bg-[#e2e1e1] dark:hover:bg-[#262626]'>
                <Link href="/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Definições</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center">
                <Sun className="mr-2 h-4 w-4" />
                <span>Modo de Cor</span> 
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center cursor-pointer">
                  <Laptop className="mr-2 h-4 w-4" />
                  <span>Sistema</span>
                  {apiTheme === 'system' && <CircleCheck className="ml-auto h-4 w-4 text-green-500" />}
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center cursor-pointer hover:bg-slate-800  hover:text-slate-100">
                  <Moon className="mr-2 h-4 w-4 text-gray-900" />
                  <span>Escuro</span>
                  {apiTheme === 'dark' && <CircleCheck className="ml-auto h-4 w-4 text-green-500" />}
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center cursor-pointer hover:bg-[#e2e1e1] dark:hover:bg-[#262626]  dark:hover:text-black">
                  <Sun className="mr-2 h-4 w-4 text-yellow-500" />
                  <span>Claro</span>
                  {apiTheme === 'light' && <CircleCheck className="ml-auto h-4 w-4 text-green-500" />}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                onClick={() => setIsLogoutDialogOpen(true)}
                className="flex items-center text-black dark:text-white hover:text-red-600 dark:hover:text-red-600 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      </div>
    </header>

<Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
<DialogContent>
  <DialogHeader>
    <DialogTitle>Confirm Logout</DialogTitle>
    <DialogDescription>
      Are you sure you want to log out? You will be redirected to the login page.
    </DialogDescription>
  </DialogHeader>
  <DialogFooter>
    <Button variant="outline" onClick={() => setIsLogoutDialogOpen(false)}>
      Cancel
    </Button>
    <Button variant="destructive" onClick={handleLogout}>
      Logout
    </Button>
  </DialogFooter>
</DialogContent>
</Dialog>
</>

  )
}
