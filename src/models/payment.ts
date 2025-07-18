import mongoose, { type Document, Schema } from "mongoose"
import { type IUser, PlanType } from "./user"
import type { ICourse } from "./course"

enum PaymentStatus {
  PENDING = "Pending",
  COMPLETED = "Completed",
  FAILED = "Failed",
  REFUNDED = "Refunded",
}

enum PaymentType {
  COURSE_PURCHASE = "Course Purchase",
  PLAN_UPGRADE = "Plan Upgrade",
  ACCOUNT_DEPOSIT = "Account Deposit",
}

export interface IPayment extends Document {
  user: IUser["_id"]
  amount: number
  balance: number
  paymentDate: Date
  status: PaymentStatus
  paymentType: PaymentType
  course?: ICourse["_id"]
  plan?: PlanType
  transactionId: string
  paymentMethod: string
}

const paymentSchema: Schema<IPayment> = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true, min: 0 },
    balance: { type: Number, required: true, min: 0 },
    paymentDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      required: true,
    },
    paymentType: {
      type: String,
      enum: Object.values(PaymentType),
      required: true,
    },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    plan: {
      type: String,
      enum: Object.values(PlanType),
    },
    transactionId: { type: String, required: true, unique: true },
    paymentMethod: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

// Validation to ensure either course or plan is provided based on paymentType
paymentSchema.pre("validate", function (next) {
  if (this.paymentType === PaymentType.COURSE_PURCHASE && !this.course) {
    return next(new Error("Course is required for course purchase payments"))
  }

  if (this.paymentType === PaymentType.PLAN_UPGRADE && !this.plan) {
    return next(new Error("Plan is required for plan upgrade payments"))
  }

  next()
})

const Payment = mongoose.models.Payment || mongoose.model<IPayment>("Payment", paymentSchema)

export default Payment

