"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MoreVertical } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCartStore } from "@/store/useCartStore"
import { toast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"

interface CourseCardProps {
  course: {
    id: number
    title: string
    instructor: string
    rating: number
    reviews: number
    price: number
    originalPrice: number
    bestSeller?: boolean
    totalHours: number
    lectures: number
  }
}

export function CourseCard({ course }: CourseCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const cartItems = useCartStore((state) => state.items)

  // Estado local para verificar se o item já está no carrinho
  const [isItemInCart, setIsItemInCart] = useState(false)

  // Verifica se o item já está no carrinho sempre que cartItems mudar
  useEffect(() => {
    setIsItemInCart(cartItems.some((item) => item.id === course.id))
  }, [cartItems, course.id])

  const handleAddToCart = () => {
    if (isItemInCart) {
      toast({
        title: "Já está no carrinho",
        description: `${course.title} já está no seu carrinho.`,
        variant: "destructive",
      })
      return
    }

    addItem({
      id: course.id,
      type: "course",
      title: course.title,
      price: course.price,
      quantity: 1,
    })

    toast({
      title: "Curso adicionado ao carrinho",
      description: `${course.title} foi adicionado ao seu carrinho.`,
      variant: "success",
    })
  }

  return (
    <Card className="flex flex-col h-full dark:bg-[#000] border-[#2563eb]/20 dark:border-[#60a5fa]/20">
      <div className="relative aspect-video">
        <Image
          src="/placeholder.svg"
          alt={course.title}
          fill
          className="object-cover rounded-sm"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <CardContent className="flex-1 p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold line-clamp-2 flex-1 pr-2">{course.title}</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-[#2563eb] dark:text-[#60a5fa]">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleAddToCart}>Adicionar ao carrinho</DropdownMenuItem>
                <DropdownMenuItem>Detalhes</DropdownMenuItem>
                <DropdownMenuItem>Prévia</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="text-sm text-muted-foreground">{course.instructor}</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-amber-500">{course.rating}</span>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(course.rating) ? "fill-amber-500 text-amber-500" : "fill-muted text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({course.reviews.toLocaleString()})</span>
          </div>
          {course.bestSeller && (
            <Badge variant="secondary" className="w-fit bg-[#9333ea] text-white dark:bg-[#c084fc] dark:text-black">
              Mais Vendido
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold">R${course.price.toFixed(2)}</span>
          <span className="text-sm text-muted-foreground line-through">R${course.originalPrice.toFixed(2)}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
