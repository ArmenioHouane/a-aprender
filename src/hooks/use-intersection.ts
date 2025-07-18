"use client"

import { useEffect, useState, type RefObject } from "react"

// Adicionando tipagem explícita para o elementRef
export function useIntersection(elementRef: RefObject<Element>, rootMargin = "0px") {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        rootMargin,
        threshold: 0,
      },
    )

    // Armazenando o valor atual do ref em uma variável
    const element = elementRef.current

    // Verificando se o elemento existe antes de observá-lo
    if (element) {
      observer.observe(element)
    }

    // Usando a variável local no cleanup para evitar o warning do ESLint
    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [elementRef, rootMargin])

  return isIntersecting
}
