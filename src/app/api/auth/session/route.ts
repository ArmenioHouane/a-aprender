import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { connectToDatabase } from "@/lib/mongodb"
import User from "@/models/user"

export async function GET(req: Request) {
  try {
    // Get the cookie header
    const cookieHeader = req.headers.get("cookie")
    if (!cookieHeader) {
      console.warn("No cookie found in request")
      return NextResponse.json({ authenticated: false, error: "No cookie found" }, { status: 401 })
    }

    // Extract the token from cookie
    const cookies = Object.fromEntries(cookieHeader.split("; ").map((c) => c.split("=")))
    const token = cookies["auth_token"]

    if (!token) {
      console.warn("Auth token not found in cookies")
      return NextResponse.json({ authenticated: false, error: "Token not found" }, { status: 401 })
    }

    // Verify the token
    const decodedUser = verifyToken(token)
    if (!decodedUser) {
      console.warn("Invalid or expired token")
      return NextResponse.json({ authenticated: false, error: "Invalid token" }, { status: 401 })
    }

    // Get fresh user data from database
    await connectToDatabase()
    const user = await User.findById(decodedUser.id).select("-password")

    if (!user) {
      console.warn("User not found in database")
      return NextResponse.json({ authenticated: false, error: "User not found" }, { status: 404 })
    }

    console.log(`User authenticated successfully: ${decodedUser.email}`)


    return NextResponse.json({
      authenticated: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
    })
  } catch (error) {
    console.error("Error authenticating user:", error)
    return NextResponse.json({ authenticated: false, error: "Internal error" }, { status: 500 })
  }
}

