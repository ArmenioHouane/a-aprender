"use client"

import { useEffect, useRef, useState } from "react"

export function useReveal(threshold = 0.1, rootMargin = "0px") {
  const [isVisible, setIsVisible] = useState(false)
  // Especificando o tipo correto para o ref como HTMLDivElement
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold, rootMargin },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin])

  return { ref, isVisible }
}
