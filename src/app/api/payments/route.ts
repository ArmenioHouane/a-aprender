//api/payments
import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Payment from "@/models/payment"
import User from "@/models/user"
import Plan from "@/models/plan" // Import Plan model
import mongoose from "mongoose"

// Define a proper interface for the query object
interface PaymentQuery {
  user?: string
  paymentType?: string
  status?: string
}

export async function GET(request: NextRequest) {
  await connectToDatabase()

  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const paymentType = searchParams.get("paymentType")
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1", 10)
    const pageSize = Number.parseInt(searchParams.get("pageSize") || "10", 10)
    const skip = (page - 1) * pageSize

    const query: PaymentQuery = {}
    if (userId) query.user = userId
    if (paymentType) query.paymentType = paymentType
    if (status) query.status = status

    const totalPayments = await Payment.countDocuments(query)
    const payments = await Payment.find(query)
      .populate("user", "name email")
      .populate("course", "title")
      .sort({ paymentDate: -1 })
      .skip(skip)
      .limit(pageSize)

    return NextResponse.json(
      {
        payments,
        total: totalPayments,
        page,
        pageSize,
        totalPages: Math.ceil(totalPayments / pageSize),
      },
      { status: 200 },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Error fetching payments." }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  await connectToDatabase()
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const body = await request.json()
    const { user: userId, amount, paymentType, plan, course } = body

    // Generate a unique transaction ID
    const transactionId = `TRX-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    // Get the user to update their balance
    const user = await User.findById(userId).session(session)
    if (!user) {
      await session.abortTransaction()
      session.endSession()
      return NextResponse.json({ error: "User not found." }, { status: 404 })
    }

    // Calculate new balance
    const newBalance = user.balance + amount

    // Create payment record
    const payment = new Payment({
      ...body,
      transactionId,
      balance: newBalance,
      course,
    })

    await payment.save({ session })

    // Update user balance
    await User.findByIdAndUpdate(userId, { balance: newBalance }, { session, new: true })

    // If it's a plan upgrade, update user's plan details
    if (paymentType === "Plan Upgrade" && plan) {
      const planDetails = await Plan.findOne({ type: plan }).session(session)
      if (!planDetails) {
        await session.abortTransaction()
        session.endSession()
        return NextResponse.json({ error: "Plan not found." }, { status: 404 })
      }

      const planStartDate = new Date()
      const planEndDate = new Date()
      planEndDate.setDate(planEndDate.getDate() + planDetails.duration)

      await User.findByIdAndUpdate(
        userId,
        {
          plan,
          planStartDate,
          planEndDate,
        },
        { session, new: true },
      )
    }

    await session.commitTransaction()
    session.endSession()

    return NextResponse.json(payment, { status: 201 })
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    console.error(error)
    return NextResponse.json({ error: "Error processing payment." }, { status: 400 })
  }
}

