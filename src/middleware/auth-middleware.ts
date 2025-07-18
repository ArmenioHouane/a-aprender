import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "@/lib/auth"
import type { JwtPayload } from "jsonwebtoken"

// Define the expected JWT payload structure
interface CustomJwtPayload extends JwtPayload {
  id: string
  email: string
  name: string
  avatar?: string
  firebaseId?: string | null
}

export function middleware(req: NextRequest) {
  // Get auth token from cookies
  const token = req.cookies.get("auth_token")?.value

  // If no token is present, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url))
  }

  // Verify the token
  const decodedUser = verifyToken(token) as CustomJwtPayload | null

  // If token is invalid or missing required fields, redirect to login
  if (!decodedUser?.id) {
    // Clear the invalid token
    const response = NextResponse.redirect(new URL("/auth/login", req.url))
    response.cookies.delete("auth_token")
    return response
  }

  // Clone the request headers
  const requestHeaders = new Headers(req.headers)

  // Add the user ID to the request headers for downstream routes
  requestHeaders.set("x-user-id", decodedUser.id)

  // Continue with the modified request
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    // Apply this middleware to account-related API routes
    "/api/account/:path*",
    // Add other protected paths as needed
  ],
}

