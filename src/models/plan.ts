import mongoose, { type Document, Schema } from "mongoose"
import { PlanType } from "./user"

export interface IPlan extends Document {
  type: PlanType
  name: string
  description: string
  price: number
  duration: number // in days
  maxCourses: number
  features: string[]
  isActive: boolean
}

const planSchema: Schema<IPlan> = new Schema(
  {
    type: {
      type: String,
      enum: Object.values(PlanType),
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    duration: { type: Number, required: true, min: 0 }, // in days
    maxCourses: { type: Number, required: true, min: 0 },
    features: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
)

const Plan = mongoose.models.Plan || mongoose.model<IPlan>("Plan", planSchema)

export default Plan

