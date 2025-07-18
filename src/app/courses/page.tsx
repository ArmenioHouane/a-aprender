"use client"

import { CourseGrid } from "@/components/course-grid"
import { FilterSidebar } from "@/components/filter-sidebar"
import { FilterSheet } from "@/components/filter-sheet"
import { useFilters } from "@/hooks/useFilters"
import { RevealWrapper } from "@/components/reveal-wrapper"
import  Header  from "@/components/header"
import  Footer  from "@/components/footer"




export default function CoursesPage() {
  const { filters, updateFilter, resetFilters, filteredCourses } = useFilters()

  return (
    <>
     <Header />
      <div className="min-h-screen mt-16 md:mt-16 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
        <div className="container py-8 md:py-12">
          <RevealWrapper direction="up">
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
                  Cursos
                </h1>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-700 dark:text-blue-300 text-sm font-medium">
                  {filteredCourses.length} resultados
                </div>
              </div>
              <FilterSheet
                filters={filters}
                updateFilter={(category, value) => {
                  if (Object.keys(filters).includes(category)) {
                    updateFilter(category as keyof typeof filters, value)
                  }
                }}
                resetFilters={resetFilters}
              />
            </div>
          </RevealWrapper>

          <div className="grid gap-8 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr]">
            <RevealWrapper direction="left" delay={100}>
              <aside className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
                <FilterSidebar
                  filters={filters}
                  updateFilter={(category, value) => {
                    if (Object.keys(filters).includes(category)) {
                      updateFilter(category as keyof typeof filters, value)
                    }
                  }}
                  resetFilters={resetFilters}
                />
              </aside>
            </RevealWrapper>

            <RevealWrapper direction="right" delay={200}>
              <main>
                <CourseGrid courses={filteredCourses} />
              </main>
            </RevealWrapper>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
