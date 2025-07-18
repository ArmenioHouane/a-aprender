"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type FilterContentProps = {
  filters: any
  updateFilter: (category: string, value: string | number) => void
  resetFilters: () => void
}

export function FilterContent({ filters, updateFilter, resetFilters }: FilterContentProps) {
  return (
    <div>
      <Button
        onClick={resetFilters}
        variant="outline"
        className="mb-4 w-full border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed]/10 dark:border-[#a78bfa] dark:text-[#a78bfa] dark:hover:bg-[#a78bfa]/10"
      >
        Redefinir Filtros
      </Button>
      <Accordion type="multiple" defaultValue={["rating", "duration", "topic", "level", "language"]}>
        <AccordionItem value="rating" className="border-[#2563eb]/20 dark:border-[#60a5fa]/20">
          <AccordionTrigger className="text-[#2563eb] dark:text-[#60a5fa]">Avaliação</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {[4.5, 4.0, 3.5].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={filters.rating.includes(rating)}
                    onCheckedChange={() => updateFilter("rating", rating)}
                    className="border-[#2563eb] data-[state=checked]:bg-[#2563eb] data-[state=checked]:border-[#2563eb] dark:border-[#60a5fa] dark:data-[state=checked]:bg-[#60a5fa] dark:data-[state=checked]:border-[#60a5fa]"
                  />
                  <Label htmlFor={`rating-${rating}`}>{rating} e acima</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="duration" className="border-[#2563eb]/20 dark:border-[#60a5fa]/20">
          <AccordionTrigger className="text-[#2563eb] dark:text-[#60a5fa]">Duração do Vídeo</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {["0-1", "1-3", "3-6", "6-17", "17+"].map((duration) => (
                <div key={duration} className="flex items-center space-x-2">
                  <Checkbox
                    id={`duration-${duration}`}
                    checked={filters.duration.includes(duration)}
                    onCheckedChange={() => updateFilter("duration", duration)}
                    className="border-[#2563eb] data-[state=checked]:bg-[#2563eb] data-[state=checked]:border-[#2563eb] dark:border-[#60a5fa] dark:data-[state=checked]:bg-[#60a5fa] dark:data-[state=checked]:border-[#60a5fa]"
                  />
                  <Label htmlFor={`duration-${duration}`}>
                    {duration === "17+" ? "17+ horas" : `${duration} horas`}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="topic" className="border-[#2563eb]/20 dark:border-[#60a5fa]/20">
          <AccordionTrigger className="text-[#2563eb] dark:text-[#60a5fa]">Tópico</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {["Python", "JavaScript", "Java", "Desenvolvimento Web", "Ciência de Dados", "C#"].map((topic) => (
                <div key={topic} className="flex items-center space-x-2">
                  <Checkbox
                    id={`topic-${topic}`}
                    checked={filters.topic.includes(topic)}
                    onCheckedChange={() => updateFilter("topic", topic)}
                    className="border-[#2563eb] data-[state=checked]:bg-[#2563eb] data-[state=checked]:border-[#2563eb] dark:border-[#60a5fa] dark:data-[state=checked]:bg-[#60a5fa] dark:data-[state=checked]:border-[#60a5fa]"
                  />
                  <Label htmlFor={`topic-${topic}`}>{topic}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="level" className="border-[#2563eb]/20 dark:border-[#60a5fa]/20">
          <AccordionTrigger className="text-[#2563eb] dark:text-[#60a5fa]">Nível</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {["Iniciante", "Intermediário", "Avançado", "Todos os Níveis"].map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox
                    id={`level-${level}`}
                    checked={filters.level.includes(level)}
                    onCheckedChange={() => updateFilter("level", level)}
                    className="border-[#2563eb] data-[state=checked]:bg-[#2563eb] data-[state=checked]:border-[#2563eb] dark:border-[#60a5fa] dark:data-[state=checked]:bg-[#60a5fa] dark:data-[state=checked]:border-[#60a5fa]"
                  />
                  <Label htmlFor={`level-${level}`}>{level}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="language" className="border-[#2563eb]/20 dark:border-[#60a5fa]/20">
          <AccordionTrigger className="text-[#2563eb] dark:text-[#60a5fa]">Idioma</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {["Inglês", "Espanhol", "Português"].map((language) => (
                <div key={language} className="flex items-center space-x-2">
                  <Checkbox
                    id={`language-${language}`}
                    checked={filters.language.includes(language)}
                    onCheckedChange={() => updateFilter("language", language)}
                    className="border-[#2563eb] data-[state=checked]:bg-[#2563eb] data-[state=checked]:border-[#2563eb] dark:border-[#60a5fa] dark:data-[state=checked]:bg-[#60a5fa] dark:data-[state=checked]:border-[#60a5fa]"
                  />
                  <Label htmlFor={`language-${language}`}>{language}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
