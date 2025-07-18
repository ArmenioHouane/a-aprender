import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import User from "@/models/user"
import { verifyToken, generateToken, setAuthCookie } from "@/lib/auth"

// GET: Refresh session data from database
export async function GET(req: NextRequest) {
  try {
    // Get current auth token
    const token = req.cookies.get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ error: "No session found" }, { status: 401 })
    }

    // Verify current token
    const currentUser = verifyToken(token)
    if (!currentUser?.id) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 })
    }

    // Connect to database and get fresh user data
    await connectToDatabase()
    const user = await User.findById(currentUser.id).select("-password")

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Generate new token with fresh data
    const newToken = generateToken({
      _id: user._id.toString(),
      email: user.email,
      name: user.name || "",
      avatar: user.avatar || "",
    })

    // Create response with new session data
    const response = NextResponse.json({
      message: "Session refreshed",
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
    })

    // Set new auth cookie
    response.headers.set("Set-Cookie", setAuthCookie(newToken))

    return response
  } catch (error) {
    console.error("Error refreshing session:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE: Clear current session
export async function DELETE() {
  const response = NextResponse.json({ message: "Session cleared" })

  // Clear all auth-related cookies
  response.cookies.delete("auth_token")
  response.cookies.delete("userRole")

  return response
}

