"use client"

import { useState, useEffect } from "react"

// Dados de exemplo para cursos
const coursesData = [
  {
    id: "1",
    title: "Desenvolvimento Web Completo",
    instructor: "João Silva",
    price: 2500,
    originalPrice: 3500,
    rating: 4.8,
    reviewCount: 1245,
    level: "Intermediário",
    duration: 42,
    category: "Desenvolvimento Web",
    image: "/placeholder.svg?height=200&width=350",
    students: 12450,
  },
  {
    id: "2",
    title: "Design UX/UI para Iniciantes",
    instructor: "Maria Oliveira",
    price: 1800,
    originalPrice: 2200,
    rating: 4.6,
    reviewCount: 856,
    level: "Iniciante",
    duration: 28,
    category: "Design UX/UI",
    image: "/placeholder.svg?height=200&width=350",
    students: 8760,
  },
  {
    id: "3",
    title: "Marketing Digital Avançado",
    instructor: "Carlos Santos",
    price: 3200,
    rating: 4.9,
    reviewCount: 1876,
    level: "Avançado",
    duration: 36,
    category: "Marketing Digital",
    image: "/placeholder.svg?height=200&width=350",
    students: 15680,
  },
  {
    id: "4",
    title: "Python para Ciência de Dados",
    instructor: "Ana Ferreira",
    price: 2800,
    originalPrice: 3600,
    rating: 4.7,
    reviewCount: 1432,
    level: "Intermediário",
    duration: 38,
    category: "Programação",
    image: "/placeholder.svg?height=200&width=350",
    students: 10240,
  },
  {
    id: "5",
    title: "Inglês para Negócios",
    instructor: "Pedro Costa",
    price: 1500,
    rating: 4.5,
    reviewCount: 987,
    level: "Iniciante",
    duration: 24,
    category: "Idiomas",
    image: "/placeholder.svg?height=200&width=350",
    students: 7650,
  },
  {
    id: "6",
    title: "Fotografia Profissional",
    instructor: "Luísa Mendes",
    price: 2200,
    originalPrice: 2800,
    rating: 4.8,
    reviewCount: 765,
    level: "Intermediário",
    duration: 32,
    category: "Fotografia",
    image: "/placeholder.svg?height=200&width=350",
    students: 5430,
  },
  {
    id: "7",
    title: "Gestão de Projetos",
    instructor: "Roberto Alves",
    price: 2900,
    rating: 4.6,
    reviewCount: 1123,
    level: "Avançado",
    duration: 40,
    category: "Negócios",
    image: "/placeholder.svg?height=200&width=350",
    students: 9870,
  },
  {
    id: "8",
    title: "Introdução à Inteligência Artificial",
    instructor: "Camila Rocha",
    price: 3500,
    originalPrice: 4200,
    rating: 4.9,
    reviewCount: 1567,
    level: "Intermediário",
    duration: 45,
    category: "Ciência de Dados",
    image: "/placeholder.svg?height=200&width=350",
    students: 11230,
  },
  {
    id: "9",
    title: "Violão para Iniciantes",
    instructor: "Fernando Lima",
    price: 1200,
    rating: 4.7,
    reviewCount: 892,
    level: "Iniciante",
    duration: 20,
    category: "Música",
    image: "/placeholder.svg?height=200&width=350",
    students: 6540,
  },
]

export function useFilters() {
  const [filters, setFilters] = useState({
    categories: [] as string[],
    level: [] as string[],
    price: [0, 5000] as [number, number],
    rating: 0,
    duration: [0, 50] as [number, number],
  })

  const [filteredCourses, setFilteredCourses] = useState(coursesData)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateFilter = (category: keyof typeof filters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [category]: value,
    }))
  }

  const resetFilters = () => {
    setFilters({
      categories: [],
      level: [],
      price: [0, 5000],
      rating: 0,
      duration: [0, 50],
    })
  }

  useEffect(() => {
    const filtered = coursesData.filter((course) => {
      // Filtro de categorias
      if (filters.categories.length > 0 && !filters.categories.includes(course.category)) {
        return false
      }

      // Filtro de nível
      if (filters.level.length > 0 && !filters.level.includes(course.level)) {
        return false
      }

      // Filtro de preço
      if (course.price < filters.price[0] || course.price > filters.price[1]) {
        return false
      }

      // Filtro de avaliação
      if (filters.rating > 0 && course.rating < filters.rating) {
        return false
      }

      // Filtro de duração
      if (course.duration < filters.duration[0] || course.duration > filters.duration[1]) {
        return false
      }

      return true
    })

    setFilteredCourses(filtered)
  }, [filters])

  return {
    filters,
    updateFilter,
    resetFilters,
    filteredCourses,
  }
}
