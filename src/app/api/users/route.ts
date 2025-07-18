//api/users

import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import User, { Student, Instructor } from "@/models/user"
import mongoose from "mongoose"

interface UserQuery {
  role?: string
}

// Add this interface to define the user document structure
interface UserDocument {
  _id: mongoose.Types.ObjectId | string
  role: string
  password?: string
  __v?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any // For other properties
}

export async function GET(request: NextRequest) {
  await connectToDatabase()

  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1", 10)
    const pageSize = Number.parseInt(searchParams.get("pageSize") || "10", 10)
    const role = searchParams.get("role")
    const skip = (page - 1) * pageSize

    const query: UserQuery = {}
    if (role && role !== "all") {
      query.role = role
    }

    const totalUsers = await User.countDocuments(query)
    const users = await User.find(query)
      .select("-password") // Exclude sensitive data
      .skip(skip)
      .limit(pageSize)
      .lean()

    return NextResponse.json(
      {
        users,
        total: totalUsers,
        page,
        pageSize,
        totalPages: Math.ceil(totalUsers / pageSize),
      },
      { status: 200 },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Error fetching users." }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  await connectToDatabase()

  try {
    const body = await request.json()
    const newUser = new User(body)
    await newUser.save()
    const userResponse = newUser.toObject()
    delete userResponse.password // Remove password from response
    return NextResponse.json(userResponse, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Error creating user." }, { status: 400 })
  }
}

export async function PUT(request: NextRequest) {
  await connectToDatabase()

  try {
    const body = await request.json()
    const { id, ...updateData } = body

    // Log the update data to see what's being sent
    console.log("Update data:", updateData)

    // First, get the current user document and type it properly
    const currentUser = (await User.findById(id).lean()) as UserDocument
    if (!currentUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 })
    }

    // Check if role is changing
    const isRoleChanging = updateData.role && currentUser.role !== updateData.role

    if (isRoleChanging) {
      console.log(`Role changing from ${currentUser.role} to ${updateData.role}`)

      // Start a session for transaction
      const session = await mongoose.startSession()
      session.startTransaction()

      try {
        // Delete the current user document
        await User.findByIdAndDelete(id).session(session)

        // Create a new user with the updated role and data
        const userData = {
          ...currentUser,
          ...updateData,
          _id: id, // Keep the same ID
        }

        // Remove MongoDB specific fields that shouldn't be duplicated
        delete userData.__v

        // Create the appropriate model based on the new role
        let newUserModel
        switch (updateData.role) {
          case "student":
            newUserModel = new Student(userData)
            break
          case "instructor":
            newUserModel = new Instructor(userData)
            break
          default:
            newUserModel = new User(userData)
        }

        // Save the new user document
        await newUserModel.save({ session })

        // Commit the transaction
        await session.commitTransaction()

        // Get the newly created user
        const updatedUser = await User.findById(id).select("-password")
        console.log("Updated user:", updatedUser)

        return NextResponse.json(updatedUser, { status: 200 })
      } catch (error) {
        // If an error occurs, abort the transaction
        await session.abortTransaction()
        console.error("Transaction error:", error)
        throw error
      } finally {
        // End the session
        session.endSession()
      }
    } else {
      // For updates that don't change the role, use the regular update
      const updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      }).select("-password")

      console.log("Updated user:", updatedUser)
      return NextResponse.json(updatedUser, { status: 200 })
    }
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json(
      { error: "Error updating user: " + (error instanceof Error ? error.message : String(error)) },
      { status: 400 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  await connectToDatabase()

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ error: "User ID is required." }, { status: 400 })

    const deletedUser = await User.findByIdAndDelete(id).select("-password")
    if (!deletedUser) return NextResponse.json({ error: "User not found." }, { status: 404 })
    return NextResponse.json({ message: "User successfully removed.", user: deletedUser }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Error deleting user." }, { status: 400 })
  }
}

