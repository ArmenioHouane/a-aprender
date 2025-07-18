/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Star } from "lucide-react"

interface FilterSidebarProps {
  filters: {
    categories: string[]
    level: string[]
    price: [number, number]
    rating: number
    duration: [number, number]
  }
  updateFilter: (category: string, value: any) => void
  resetFilters: () => void
}

const categories = [
  "Desenvolvimento Web",
  "Design UX/UI",
  "Marketing Digital",
  "Negócios",
  "Programação",
  "Ciência de Dados",
  "Idiomas",
  "Fotografia",
  "Música",
  "Saúde e Bem-estar",
]

const levels = ["Iniciante", "Intermediário", "Avançado"]

export function FilterSidebar({ filters, updateFilter, resetFilters }: FilterSidebarProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Filtros
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={resetFilters}
          className="w-full border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950 text-purple-700 dark:text-purple-300"
        >
          Limpar Filtros
        </Button>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white">Categorias</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFilter("categories", [...filters.categories, category])
                  } else {
                    updateFilter(
                      "categories",
                      filters.categories.filter((c) => c !== category),
                    )
                  }
                }}
                className="border-purple-300 dark:border-purple-700 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <label
                htmlFor={`category-${category}`}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white">Nível</h4>
        <div className="space-y-2">
          {levels.map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox
                id={`level-${level}`}
                checked={filters.level.includes(level)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFilter("level", [...filters.level, level])
                  } else {
                    updateFilter(
                      "level",
                      filters.level.filter((l) => l !== level),
                    )
                  }
                }}
                className="border-purple-300 dark:border-purple-700 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <label
                htmlFor={`level-${level}`}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
              >
                {level}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white">Preço (MT)</h4>
        <div className="px-2">
          <Slider
            defaultValue={filters.price}
            min={0}
            max={10000}
            step={500}
            value={filters.price}
            onValueChange={(value) => updateFilter("price", value)}
            className="[&_[role=slider]]:bg-purple-600"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span>{filters.price[0]} MT</span>
            <span>{filters.price[1]} MT</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white">Avaliação</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.rating <= rating}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFilter("rating", rating)
                  } else {
                    updateFilter("rating", 0)
                  }
                }}
                className="border-purple-300 dark:border-purple-700 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <label
                htmlFor={`rating-${rating}`}
                className="text-sm leading-none flex items-center space-x-1 text-gray-700 dark:text-gray-300"
              >
                <div className="flex">
                  {Array(rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  {Array(5 - rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-gray-300 dark:text-gray-600" />
                    ))}
                </div>
                <span>ou mais</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white">Duração (horas)</h4>
        <div className="px-2">
          <Slider
            defaultValue={filters.duration}
            min={1}
            max={50}
            step={1}
            value={filters.duration}
            onValueChange={(value) => updateFilter("duration", value)}
            className="[&_[role=slider]]:bg-purple-600"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span>{filters.duration[0]}h</span>
            <span>{filters.duration[1]}h</span>
          </div>
        </div>
      </div>
    </div>
  )
}
