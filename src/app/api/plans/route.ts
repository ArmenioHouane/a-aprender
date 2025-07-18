//api/plans
import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Plan from "@/models/plan"

// Define a proper interface for the query object
interface PlanQuery {
  type?: string
  isActive?: boolean
}

export async function GET(request: NextRequest) {
  await connectToDatabase()

  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const isActive = searchParams.get("isActive") === "true"

    const query: PlanQuery = {}
    if (type) query.type = type
    if (isActive !== null) query.isActive = isActive

    const plans = await Plan.find(query).sort({ price: 1 })
    return NextResponse.json(plans, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Error fetching plans." }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  await connectToDatabase()

  try {
    const body = await request.json()
    const newPlan = new Plan(body)
    await newPlan.save()
    return NextResponse.json(newPlan, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Error creating plan." }, { status: 400 })
  }
}

