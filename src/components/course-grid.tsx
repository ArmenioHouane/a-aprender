import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Clock, BookOpen, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Course {
  id: string
  title: string
  instructor: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  level: string
  duration: number
  category: string
  image: string
  students: number
}

interface CourseGridProps {
  courses: Course[]
}

export function CourseGrid({ courses }: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="h-8 w-8 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Nenhum curso encontrado</h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Tente ajustar seus filtros ou procure por outra categoria para encontrar o curso perfeito para você.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => (
        <Card
          key={course.id}
          className="overflow-hidden group hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
        >
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={course.image || "/placeholder.svg"}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <Link href={`/cursos/${course.id}`} className="w-full">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Ver Curso
                </Button>
              </Link>
            </div>
          </div>
          <CardHeader className="p-4">
            <div className="flex justify-between items-start">
              <Badge
                variant="outline"
                className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
              >
                {course.category}
              </Badge>
              <Badge
                variant="outline"
                className="bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
              >
                {course.level}
              </Badge>
            </div>
            <Link href={`/cursos/${course.id}`} className="hover:underline">
              <h3 className="font-bold text-lg mt-2 text-gray-900 dark:text-white line-clamp-2">{course.title}</h3>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">Por {course.instructor}</p>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(course.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{course.rating.toFixed(1)}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">({course.reviewCount})</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{course.duration}h</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{course.students.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">{course.price.toLocaleString()} MT</div>
              {course.originalPrice && (
                <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                  {course.originalPrice.toLocaleString()} MT
                </div>
              )}
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-2 border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Detalhes
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
