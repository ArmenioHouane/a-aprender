"use client"

import { useReveal } from "@/hooks/use-reveal"
import type { ReactNode } from "react"

interface RevealWrapperProps {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right" | "fade"
  delay?: number
  className?: string
}

export function RevealWrapper({ children, direction = "up", delay = 0, className = "" }: RevealWrapperProps) {
  const { ref, isVisible } = useReveal()

  const getTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(50px)"
      case "down":
        return "translateY(-50px)"
      case "left":
        return "translateX(50px)"
      case "right":
        return "translateX(-50px)"
      case "fade":
        return "none"
      default:
        return "translateY(50px)"
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : getTransform(),
        transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
