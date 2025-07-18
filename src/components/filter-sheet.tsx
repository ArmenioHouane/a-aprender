/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { FilterSidebar } from "@/components/filter-sidebar"
import { SlidersHorizontal } from "lucide-react"

interface FilterSheetProps {
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

export function FilterSheet({ filters, updateFilter, resetFilters }: FilterSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden border-2 border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[400px] bg-white dark:bg-gray-900 border-r-purple-200 dark:border-r-purple-800"
      >
        <SheetHeader>
          <SheetTitle className="text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
            Filtros
          </SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <FilterSidebar filters={filters} updateFilter={updateFilter} resetFilters={resetFilters} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
